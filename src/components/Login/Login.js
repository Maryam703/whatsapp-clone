import React,{useState} from 'react'
import "./Login.css"
import { Link } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Handelsubmit = () => {}

    return (
    <div className="Login-container">
        <div className="login-logo"><img className="login-logo-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPADVMClbsK0sjUlU7iTXpQ7krJwQfTW_ezg&s" /></div>
        <form onSubmit={Handelsubmit}>
          <input
            type="email"
            required
            className="whatsapp-login-input"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="whatsapp-login-input"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="whatsapp-button">Login</button>
          <div>Don't have an account?<Link className="reg-link" to={"/Register"}>Register here!</Link></div>
        </form>
      </div>
  )
}
