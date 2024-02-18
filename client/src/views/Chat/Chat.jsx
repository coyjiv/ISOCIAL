import { useState, useEffect } from 'react';
import './Chat.scss';
import cx from 'classnames';
import { API_URL, instance } from "../../api/config";
import { useLocation } from 'react-router-dom';



const Chat = () => {
  const location = useLocation();
  const  chatId  = location.state.chatId;
  console.log(chatId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    instance.get(`http://localhost:9000/api/messages?page=0&quantity=30&chatId=${chatId}`)
      .then((response) => {
        setMessages(response.data)
      console.log(response);})
      
      .catch((error) => console.error('Data error:', error));
  }, []);

  const handleSendMessage = async (event) => {
    if (event.key === 'Enter') {
      if (newMessage.trim() !== '') {

      try {
        await instance.post(`http://localhost:9000/api/messages?chatId=${chatId}`, {text: newMessage});
        const response = await instance.get(`http://localhost:9000/api/messages?page=0&quantity=30&chatId=${chatId}`)
        console.log(response);
        setMessages(response.data);
        setNewMessage('');
      } catch (error) {
        console.error('Send message error:', error);
      }
        
      }
    }
  };

  const deleteMessage = async (item) => {

      try {
        console.log(item.id);
        await instance.delete(`http://localhost:9000/api/messages/${item.id}`);
        const response = await instance.get(`http://localhost:9000/api/messages?page=0&quantity=30&chatId=${chatId}`)
        console.log(response);
        setMessages(response.data);
        setNewMessage('');
      } catch (error) {
        console.error('Delete message error:', error);
      }     
  };

    return (
    <>
    <div className="App">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
           <div key={index} className={cx('message-item', {'user': message.senderId === 1}, {"bot":message.senderId !== 1})}>
            <div className={cx(messages[index + 1] === undefined || {'message-avatar' : (messages[index + 1].senderId === 1)})}></div>
            <div className='message-text'>
              {message.text}
            </div>
            <div className='message-options'>
              <div className='message-options_option' onClick={() => deleteMessage(message)}><img src="./free-icon-delete-2907762.png"></img></div>
              <div className='message-options_option'></div>
              <div className='message-options_option'></div>
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
    </div>
    </>
    )
}

export default Chat