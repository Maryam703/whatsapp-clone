import React,{useState} from 'react'
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from "../../Config/FirebaseConfig"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'firebase/database';
import { set } from 'firebase/database';
import Loader from '../Loader/Loader';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const Handelsubmit = async(e) => {
      setLoading(true)
      e.preventDefault()
      try {
        const users = await createUserWithEmailAndPassword(auth, email, password)
        
        const user = {
          name : name,
          email : email,
          about: "Available",
          file : "",
          id : users.user.uid,
        }

        await set(ref(db, "users/"+ users.user.uid), user)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
      navigate("/Login")
    }

  return (
    <>
    {loading && <Loader/> }
    <div className="Register-container">
        <form onSubmit={Handelsubmit}>
          <input
            type="text"
            required
            className="whatsapp-reg-input"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="whatsapp-button">Sign Up</button>
          <div>Already have an account?<Link className="reg-link" to={"/Login"}>Login here!</Link></div>
        </form>
      </div>
      </>
  )
}
