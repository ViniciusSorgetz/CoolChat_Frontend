import { useContext, useEffect, useState } from "react"
import coolchat from '../../axios/config';
import { redirect, useNavigate, Link } from 'react-router-dom';
import { UserContext } from "../../contexts/user";
import Dice from '../../assets/Dice.svg';
import FormGroup from "../../components/form-group/FormGroup";
import './Register.css';

const Register = () =>{

   const adjectives = [
    "Lazy", "Angry", "Happy", "Sad", "Brave", "Clever", "Shy", "Friendly", 
    "Grumpy", "Excited", "Calm", "Curious", "Jolly", "Gentle", "Fierce", "Clumsy", 
    "Silly", "Sneaky", "Witty", "Bored", "Energetic", "Proud", "Nervous", "Confident", 
    "Quiet", "Loud", "Serious", "Goofy", "Optimistic", "Pessimistic", "Loyal", 
    "Stubborn", "Thoughtful", "Generous", "Rude", "Polite", "Bold", "Timid", 
    "Fearless", "Cautious", "Ambitious", "Lazy", "Reliable", "Honest", "Creative", 
    "Resourceful", "Charming", "Passionate", "Indecisive", "Persistent"
  ];
  
   const animals = [
    "Lion", "Tiger", "Elephant", "Giraffe", "Panda", "Koala", "Kangaroo", "Dolphin", 
    "Shark", "Whale", "Octopus", "Penguin", "Eagle", "Hawk", "Wolf", "Bear", 
    "Fox", "Rabbit", "Deer", "Moose", "Bison", "Rhino", "Hippo", "Cheetah", 
    "Leopard", "Zebra", "Crocodile", "Alligator", "Snake", "Turtle", "Chameleon", 
    "Frog", "Toad", "Bat", "Owl", "Parrot", "Flamingo", "Peacock", "Raccoon", 
    "Skunk", "Otter", "Beaver", "Hedgehog", "Squirrel", "Chipmunk", "Antelope", 
    "Buffalo", "Jaguar", "Lynx", "Cougar"
  ];

  const nickInput = document.getElementById("nick");

  const {user, setUser} = useContext(UserContext);

  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if(user) navigate("/home/profile");
  }, []);

  const createAccount = async (e) => {
    e.preventDefault();
    try {
      const resp = await coolchat.post("/user/register", {nick, password, confirmationPassword});
      const data = resp.data;
      const newUser = {
        nick: data.nick,
        userId: data.userId,
        token: data.token
      }
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/profile");
    } 
    catch (error) {
      const thisError = await error.response.data.msg
      setError(thisError);
    }
  }

  const generateNick = () => {
    console.log("gerando nick...");
    const num1 = Math.floor(Math.random() * adjectives.length);
    const num2 = Math.floor(Math.random() * animals.length);
    const adjective = adjectives[num1];
    const animal = animals[num2];
    document.getElementById("nick").style.scale = "0.90";
    document.getElementById("nick").style.color = "gray";
    setTimeout(() => {
      document.getElementById("nick").style.scale = "1";
      document.getElementById("nick").style.color = "white";
    }, 100);
    setNick(adjective + " " + animal);
  }

  return (
    <div>
      <h2 className="title">Criar uma conta</h2>
      <form onSubmit={createAccount} className="home-form">
        <div className="form-group">
          <label htmlFor="name">Insira neu nick</label>
          <div className="border form-border">
            <div className="inside nick-group">
              <input 
                placeholder="nick" 
                type="text" 
                name="nick"
                id="nick"
                onChange={(event) => setNick(event.target.value)}
                value={nick}
              />
              <img src={Dice} alt="Dice" className="dice-img" onClick={generateNick}/>
            </div>
          </div>
        </div>
        <FormGroup
          label="Insira sua senha"
          placeholder="senha"
          name={"password"}
          set={setPassword}
          value={password}
        />
        <FormGroup
          label="Confirme sua senha"
          placeholder="senha de confirmação"
          name={"confirmationPassword"}
          set={setConfirmationPassword}
          value={confirmationPassword}
        />
        <button type="submit" className="cool-btn">Criar conta</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p 
      className="create-account" 
      style={{
        textAlign: "center",
        padding: "10px"
      }}
      >
          Já tem uma conta? <label><Link to={"/home"}>Entrar</Link></label>
      </p>
    </div>
  )
}

export default Register