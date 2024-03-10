/* eslint-disable no-unused-vars */
//libs
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



import ChatItem from './ChatItem';
import "./Chat.scss"
import { useGetChatsQuery, useCreateChatMutation } from "../../store/services/chatService";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../store/chatSlice";

const ChatList = () => {
  const dispatch = useDispatch();
  // const chatStore = useSelector((state) => state.chat.chats);
  const [page, setPage] = useState(0);
  const [receiverId, setReceiverId] = useState(7);
  const [text, setText] = useState('asasasd');
  const [attachments, setAttachments] = useState([]);
  const { data: chats, isLoading } = useGetChatsQuery(page);
  const [addChat] = useCreateChatMutation();
  const chatResponse = {"text": "string","attachments": ["string"]};
  console.log(chatResponse.attachments);

  // useEffect(() => {
  //   if (!isLoading && chats && chats.length > 0 && !chatStore.length) {
  //     dispatch(setChats(chats));
  //   }
  // }, [isLoading, chats, dispatch, chatStore.length]);

  const handleCreateChat = async (values) => {
    try {
      const response = await addChat({receiverId, text: values.text, attachments: values.attachments});
      console.log(response);
      //setMessages([...messagesData, response.data]);
    } catch (error) {
      console.error('Create chat error:', error);
    }

  }


  return (
    <div className="chats">
      <div className="chats-head"><div className="add-chat" onClick={() => handleCreateChat(chatResponse)}><AiOutlinePlus className="add-chat__plus" /></div>
      <Autocomplete spacing={2} size="small" sx={{marginLeft: '15px', backgroundColor: '#ccc', outlineColor: 'transparent/', width: '60%', borderRadius: '22px', underline: 'none' }}
        freeSolo
        disableClearable
        options={chats && chats.map((friend) => friend.id)}
        renderInput={(params) => (
          <TextField sx={{ fontSize: '16px', lineHeight: '1.5em'}}
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              type: 'search',
            }
          }
          />
        )}
      /></div>
      <div className="chat-list">
        {chats && chats.map((chat, i) => (
          <ChatItem
            chats={chats}
            chat={chat}
            key={i}
            chatId={chat.id}
            chatName={chat.chatName}
            lastMessage={chat.lastMessage}
            lastMessageBy={chat.lastMessageBy}
            lastMessageDate={chat.lastMessageDate}
            chatAvatar={chat.avatarUrl}
          />
        ))}
        {(!chats || chats.length === 0) && <span className="no-chats">No chats yet</span>}

      </div>
    </div>
  );
};

export default ChatList