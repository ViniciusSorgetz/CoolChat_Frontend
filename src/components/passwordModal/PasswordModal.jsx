import './PasswordModal.css';
import FormGroup from '../form-group/FormGroup';
import coolchat from '../../axios/config';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';

import CloseModal from '../../assets/CloseModal.svg'

const PasswordModal = (props) => {

    const {user, chats, setChats} = useContext(UserContext);
    const { closeModal, setPassword, password, room, token } = props;
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const joinRoom = async (e) => {
        e.preventDefault();
        try {
            await coolchat.post(`/room/join/${room.id}`, {password}, {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
            });
            const index = chats.findIndex((chat => chat.id === room.id));
            if(index !== -1){
              navigate(`/chat/${index + 1}`);
              return;
            }
            const newChats = [...chats, {id: room.id, name: room.name, password}];
            setChats(newChats);
            navigate(`/chat/${newChats.length}`);
        } 
        catch (error) {
            console.log(error);
            const thisError = await error.response.data.msg;
            setError(thisError);
        }
    }

    return (
        <div className="password-modal-overlay">
            <div className="password-modal">
                <div className="password-modal-header">
                    <img 
                        style={{cursor: "pointer"}} 
                        src={CloseModal}
                        onClick={closeModal}
                    />
                </div>
                <form onSubmit={joinRoom}>
                    <FormGroup
                        label="Insira a senha do chat"
                        placeholder="senha"
                        name={"password"}
                        set={setPassword}
                        value={password}
                    />
                    <button className="cool-btn" type="submit">Entrar na sala</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}

export default PasswordModal;