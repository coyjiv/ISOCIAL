import { useState, useEffect, useRef } from 'react';
import './Chat.scss';
import cx from 'classnames';
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteMessageMutation, useGetMessagesQuery, useSendMessageMutation } from '../../store/services/chatService';



const Chat = () => {
  //const location = useLocation();
  //console.log(location);
  //const chatId = location.state.chatId;
  //const chatId = useGetMessagesQuery(chatId);
  const chatId = 2;


  const [messagesData, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0)
  const contentRef = useRef();

  const { data: messages, isLoading } = useGetMessagesQuery({ page, chatId }, { skip: !chatId })
  const [sendMessage] = useSendMessageMutation()
  const [deleteMessage] = useDeleteMessageMutation()
  const userId = Number(localStorage.getItem('userId'));
  console.log(userId);
  console.log(chatId);

  useEffect(() => {
    if (!isLoading && messages && messages.length > 0) {
      setMessages(messages)
    }
  }, [isLoading, messages])

  // useEffect(() => {
  //   instance.get(`http://localhost:9000/api/messages?page=0&quantity=30&chatId=${chatId}`)
  //     .then((response) => {
  //       setMessages(response.data)
  //       console.log(response);
  //       scrollBottom();
  //     })

  //     .catch((error) => console.error('Data error:', error));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleSendMessage = async (event) => {
  //   if (event.key === 'Enter') {
  //     if (newMessage.trim() !== '') {

  //       try {
  //         await instance.post(`http://localhost:9000/api/messages?chatId=${chatId}`, { text: newMessage });
  //         const response = await instance.get(`http://localhost:9000/api/messages?page=0&quantity=30&chatId=${chatId}`)
  //         console.log(response);
  //         setMessages(response.data);
  //         setNewMessage('');
  //       } catch (error) {
  //         console.error('Send message error:', error);
  //       }

  //     }
  //   }
  // };

  const handleSendMessage = async (event) => {
    if (event.key === 'Enter') {
      if (newMessage.trim() !== '') {

        try {
          const response = await sendMessage({ chatId, text: newMessage })
          console.log(response.data);
          setMessages([...messagesData, response.data]);
          setNewMessage('');
        } catch (error) {
          console.error('Send message error:', error);
        }

      }
    }
  };

  const handleDeleteMessage = async (item) => {

    try {
      console.log(item.id);
      await deleteMessage({ messageId: item.id })
      // const response = await instance.get(`http://localhost:9000/api/messages?page=0&quantity=30&chatId=${chatId}`)
      // console.log(response);
      // setMessages(response.data);
      setNewMessage('');
    } catch (error) {
      console.error('Delete message error:', error);
    }
  };


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

  return (
    <>
      <div className="message-container" >
        <div className="chat-messages" ref={contentRef}>
          {messagesData.map((message, index) => (
            <div key={index} className={cx('message-item', { 'user': message.senderId === userId }, { "bot": message.senderId !== userId })}>
              <div className={cx(messages[index - 1] === undefined || { 'message-avatar': (messages[index - 1].senderId !== userId) })}></div>
              <div className="message-body">
                <div className='message-text'>
                  {message.text}
                </div>
                <div className="message-img">

                </div>
              </div>
              <div className='message-options'>
                <div className='message-options-option' onClick={() => handleDeleteMessage(message)}><AiOutlineDelete /></div>
                <div className='message-options-option'></div>
                <div className='message-options-option'></div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleSendMessage}
          />
        </div>
      </div>
    </>
  )
}

export default Chat