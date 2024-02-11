import { useState } from 'react';
import './Chat.scss';
import cx from 'classnames';



const Chat = () => {

  const sampleMessage = [
    { text: 'Hi, everyone', sender: 'bot' },
    { text: 'What is your name?', sender: 'bot' },
    { text: 'Hi, new friend', sender: 'user' },
    { text: 'How are you?', sender: 'bot' },
    { text: 'I am ok! And you?', sender: 'user' },
  ];

  const [messages, setMessages] = useState(sampleMessage);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (event) => {
    if (event.key === 'Enter') {
      if (newMessage.trim() !== '') {
        setMessages([...messages, { text: newMessage, sender: 'user' }]);
        setNewMessage('');
      }
    }
  };

  {messages.map((message, index) => (
    console.log(messages[index - 1])
   ))}

    return (
    <>
    <div className="App">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
           <div key={index} className={cx('message-item', {'user': message.sender === 'user'}, {"bot":message.sender === 'bot'})}>
            <div className={cx(messages[index + 1] === undefined || {'message-avatar' : (messages[index + 1].sender !== 'bot')})}></div>
            <div className='message-text'>
              {message.text}
            </div>
            <div className='message-options'>
              <div className='message-options_option'><img src="./public/assets/free-icon-delete-2907762.png"></img></div>
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