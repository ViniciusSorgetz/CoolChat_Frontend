import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import coolchat from '../../axios/config';

import "./Chat.css";

const Chat = () => {

  const { user, chats, socket, currentChatId, setCurrentChatId } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate("/");
  }, []);

  useEffect(() => {
    if(chats.length === 0 || !location.pathname.includes("chat/")) return;
    const url = window.location.href;
    const index = url.split("/")[4]-1;
    if(!currentChatId){
      console.log("Entrou na sala " + chats[index].id);
      socket.emit("join-room", chats[index].id)
      setCurrentChatId(chats[index].id);
    }
    else if(currentChatId != chats[index].id){
      console.log("Entrou na sala " + chats[index].id);
      socket.emit("leave-room", currentChatId);
      setCurrentChatId(chats[index].id);
      socket.emit("join-room", chats[index].id)
    }
    getMessages(index);
    setIndex(index);
    const room = chats[index];
    setRoom(room);
  }, [location]);

  useEffect(() => {
    if(!socket) return;
    socket.on("receive-message", (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getMessages = async (index) => {
    const { id, password, type } = chats[index];
    console.log(index);
    try {
      const resp = await coolchat.get(`/room/${id}`, {
        params: { password },
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setMessages(resp.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async (e) =>{
    e.preventDefault();
    if(content.length === 0) return;
    if(content.trim().length === 0) return;
    const message = {
      nick: user.nick,
      content: content,
      postedAt: Date.now()
    }
    setMessages(prevMessages => [...prevMessages, message]);
    socket.emit("send-message", message, room.id);
    console.log("enviando mensagens");
    const messageRequest = 
    room.type === "public" ?
      {
        userId: user.userId,
        roomId: room.id,
        content: content
      } :
      {
        userId: user.userId,
        roomId: room.id,
        content: content,
        password: room.password
      }
    await coolchat.post("/room/message", messageRequest, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    setContent("");
  }

  const getDate = (messageDate) => {
    const date = new Date(messageDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses começam do 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return`${day}/${month}/${year} às ${hours}:${minutes}`;
  }

  return (
    <>
      <div className="messages-container">
        <ul className="messages">
          {chats[index] && <h2 className="title">{chats[index].name}</h2>}
          {messages.map((message, index) => (
            <li className="message" key={index}>
              {message.nick === user.nick ? (<>
                <div className="message-you">
                  <span>Você - </span>
                  <span className="date">{getDate(message.postedAt)}</span>
                </div>
                <div className="your-message-content"><span>{message.content}</span></div>
              </>) :
              (<>
                <div className="message-user">
                  <span>{message.nick} - </span>
                  <span className="date">{getDate(message.postedAt)}</span>
                </div>
                <div className="message-content"><span>{message.content}</span></div>
              </>)}
            </li>
          ))}
          <li ref={messagesEndRef}></li>
        </ul>
        <form onSubmit={sendMessage}>
          <div className="border">
            <div className="inside send-message-container">
              <textarea 
                type="text" 
                placeholder="message" 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="cool-textarea"
              >
              </textarea>
              <button type="submit" className="cool-btn">Enviar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Chat