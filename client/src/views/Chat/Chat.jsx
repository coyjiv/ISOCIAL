import { useState, useEffect, useRef } from 'react';
import './Chat.scss';
import cx from 'classnames';
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { useDeleteMessageMutation, useGetMessagesQuery, useSendMessageMutation } from '../../store/services/chatService';
import { AutosizeTextareaSend } from '../../components/AutosizeTextareaSend';
import * as Yup from 'yup';
import { useParams } from 'react-router';
import PropTypes from 'prop-types'
import { withWebsocket } from '../../hooks/withWebsocket'
import { TbSquareRoundedNumber3Filled } from 'react-icons/tb';

const validationScheme = Yup.object().shape({
  text: Yup.string().required('Message is required').max(260, 'Message is too long'),
});


const ChatPage = ({ id }) => {
  const { id: paramsId } = useParams();

  const chatId = id || paramsId;


  const [messagesData, setMessages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0)
  const contentRef = useRef();

  const { data: messages, isLoading } = useGetMessagesQuery({ page, chatId }, { skip: !chatId })
  const [sendMessage] = useSendMessageMutation()
  const [deleteMessage] = useDeleteMessageMutation()
  const userId = Number(localStorage.getItem('userId'));

  console.log(messages);

  useEffect(() => {
    if (!isLoading && messages && messages.length > 0) {
      setMessages(messages)
    }
  }, [isLoading, messages])


  const handleSendMessage = async (values) => {
    try {
      const response = await sendMessage({ chatId, text: values.text })
      console.log(response.data);
      setMessages([...messagesData, response.data]);
    } catch (error) {
      console.error('Send message error:', error);
    }

  }

  const handleDeleteMessage = async (item) => {

    try {
      console.log(item.id);
      await deleteMessage({ messageId: item.id })
      setMessages(messagesData.filter((message) => message.id !== item.id));
    } catch (error) {
      console.error('Delete message error:', error);
    }
  };

  /*const handleEditMessage = async (item) => {

    try {
      console.log(item.id);
      await deleteMessage({ messageId: item.id })
      setMessages(messagesData);
    } catch (error) {
      console.error('Delete message error:', error);
    }
  };*/



  // eslint-disable-next-line no-unused-vars
  const scrollBottom = () => {
    const contentHeight = contentRef.current.clientHeight;
    console.log(contentRef);
    console.log(contentHeight);
    window.scrollTo({
      bottom: contentHeight,
      behavior: 'smooth',
    });
  }

  /*useEffect(scrollBottom, []);*/

  const chatContainerRef = useRef(null);
  console.log(chatContainerRef);

  /*const scrollToBottom = () => {
    chatContainerRef.current.parentElement.scrollTop = chatContainerRef.current.scrollHeight;
    console.log(chatContainerRef.current.scrollHeight);
  };*/


  return (
    <>
      <div className="message-container" >
        <div className="chat-messages" ref={chatContainerRef}>
          {messagesData.map((message, index) => (
            <div key={index} className={cx('message-item', { 'user': message.senderId === userId }, { "bot": message.senderId !== userId })}>
              <div className={cx(messages[index - 1] === undefined || { 'message-avatar': ((message.senderId !== userId) && (!messages[index + 1] || messages[index + 1].senderId === userId)) })}><img src={TbSquareRoundedNumber3Filled} alt="" /></div>
              <div className="message-body">
                <div className='message-text'>
                  {message.text}
                </div>
                <div className="message-img">
                  {message.attachment}
                </div>
              </div>
              <div className='message-options'>
                <div className='message-options-option' onClick={() => handleDeleteMessage(message)}><AiOutlineDelete /></div>
                <div className='message-options-option'><AiFillEdit /></div>
              </div>
            </div>
          ))}
          {!chatId && <span className="no-chats">Select a chat to start messaging</span>}
        </div>
      </div>
      <div className="chat-input">
          <AutosizeTextareaSend
            onSubmit={handleSendMessage}
            placeholder={"Type your message..."}
            validationScheme={validationScheme}
          />
      </div>
    </>
  )
}

ChatPage.propTypes = {
  id: PropTypes.number
}

export const Chat = withWebsocket(ChatPage)