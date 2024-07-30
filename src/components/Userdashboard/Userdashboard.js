import React from 'react'
import "./Userdashboard.css"

export default function Userdashboard() {
  return (
    <div className='user-dashboard-container'>
    <div className='user-dashboard-form'>
      <p>Profile</p>
      <div className='user-profile-section'>
        <div className='user-profile'><img src=''/></div>
      </div>

      <div className='user-name-section'>
        <label>Your name</label>
        <div className='user-info'>Maryam</div>
      </div>
      
      <div className='user-about-section'>
        <label>About</label>
        <div className='user-info'>About user........</div>
      </div>
    </div>
    </div>
  )
}
