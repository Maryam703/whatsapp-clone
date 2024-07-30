import React from 'react'
import "./Sidebar.css"
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()

  const handleUser = () => {
    navigate("/Userdashboard")
  }
  
  return (
    <div className='sidebar-container'>
     <div className='sidebar-box1' onClick={handleUser}>
        <div className='cont-file'><img src='' /></div>
      </div>

      <div className='sidebar-box2'>
        <i class="fa-regular fa-message"></i>
      </div>

      <div className='sidebar-box2'>
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  )
}
