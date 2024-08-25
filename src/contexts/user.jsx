import { createContext, Provider, useEffect, useState } from "react";
import coolchat from '../axios/config';
import { io } from 'socket.io-client';

const UserContext = createContext("");

const UserProvider = ({children}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [chats, setChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        checkToken();
        const newSocket = io("http://localhost:9000");
        newSocket.on("connect");
        setSocket(newSocket);
        //getSocket();
    }, []);

    const checkToken = async () => {
        try {
            await coolchat.post("/user/checkToken", {token: user.token}, {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
            }); 
        } 
        catch (error) {
            console.log(error);
            setUser(null);
            localStorage.clear();
        }
    }
    
    const getSocket = () => {
        if (socket) return;
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA SOCKET");
        const newSocket = io("http://localhost:9000");
        newSocket.on("connect");
        setSocket(newSocket);
    }

    return(
        <UserContext.Provider value={{
            user, setUser, 
            chats, setChats, 
            socket, 
            currentChatId, setCurrentChatId}}>
        {children}
        </UserContext.Provider>
    );
}

export { UserContext };
export default UserProvider;