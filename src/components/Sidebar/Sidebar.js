import React from 'react'
import "./Sidebar.css"
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  let user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  const handleUser = () => {
    navigate("/Userdashboard")
  }

  const handleChat = () => {
    navigate("/")
  }

  const LogOut = () => {
    localStorage.removeItem("user")
    navigate("/Login")
  }
  
  return (
    <div className='sidebar-container'>
     <div className='sidebar-box1' onClick={handleUser}>
        {user.file ? (<div className='cont-file'><img src={user.file} /></div>)
        : (<div className='cont-file'><img src='https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg' /></div>)}
      </div>

      <div className='sidebar-box2' onClick={handleChat}>
        <i class="fa-regular fa-message"></i>
      </div>

      <div className='sidebar-box2' onClick={LogOut}>
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  )
}
