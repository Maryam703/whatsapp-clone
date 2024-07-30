import React,{useState} from 'react'
import "./Register.css"
import { Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Handelsubmit = () => {}

  return (
    <div className="Register-container">
        <form onSubmit={Handelsubmit}>
          <input
            type="email"
            required
            className="whatsapp-reg-input"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="whatsapp-reg-input"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="whatsapp-button">Login</button>
          <div>Already have an account?<Link className="reg-link" to={"/Login"}>Login here!</Link></div>
        </form>
      </div>
  )
}
