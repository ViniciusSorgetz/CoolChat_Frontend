import { useContext, useEffect, useState } from 'react';
import CoolChatLogo from '../../../public/CoolChatLogo.svg';

import'./Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import coolchat from '../../axios/config';
import FormGroup from '../../components/form-group/FormGroup';

const Home = () => {

  const {user, setUser} = useContext(UserContext);

  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const login = async (e) => {
    e.preventDefault();
    try {
      const resp = await coolchat.post("/user/login", {nick, password});
      const data = resp.data;
      const newUser = {
        nick: data.nick,
        userId: data.userId,
        token: data.token
      }
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/chat-list");
    } 
    catch (error) {
      const thisError = await error.response.data.msg;
      setError(thisError);
    }
  }
  
  const navigate = useNavigate();

  return (<>
    <div className="title-container">
      <h1 className="title">COOL CHAT</h1>
      <img src={CoolChatLogo} style={{scale: "0.8"}}></img>
    </div>
    <form onSubmit={login} className="home-form">
      <FormGroup
        label="Insira seu nick"
        placeholder="nick"
        name={"nick"}
        set={setNick}
        value={nick}
      />
      <FormGroup
        label="Insira sua senha"
        placeholder="senha"
        name={"password"}
        set={setPassword}
        value={password}
      />
      <button type="submit" className="cool-btn">Entrar</button>
    </form>
    {error && <p className="error-message">{error}</p>}
    <p 
      className="create-account" 
      style={{
        textAlign: "center",
        padding: "10px"
      }}
    >
        Não tem uma conta? <label><Link to={"/register"}>Criar uma conta</Link></label>
    </p>
  </>)
}

export default Home;