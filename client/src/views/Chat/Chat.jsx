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

  const { data: messages, isLoading } = useGetMessagesQuery({ page, chatId }, {skip: !chatId})

  const scrollToBottom = () => {
    chatContainerRef.current.parentElement.scrollTop = chatContainerRef.current.scrollHeight;
    console.log(chatContainerRef.current.scrollHeight);
  };


  return (
    <>
      <div className="message-container" >
        <div className="chat-messages" ref={chatContainerRef}>
          {messagesData.map((message, index) => (contentRef
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
          {!chatId && <span className="no-chats">Select a chat to start messaging</span>}
        </div>
        <div className="chat-input">
          <AutosizeTextareaSend
            onSubmit={handleSendMessage}
            placeholder={"Type your message..."}
            validationScheme={validationScheme}
          />
        </div>
      </div>
    </>
  )
}

ChatPage.propTypes = {
  id: PropTypes.number
}

export const Chat = withWebsocket(ChatPage)