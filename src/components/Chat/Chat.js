import React from 'react'
import "./Chat.css"
import { Link } from 'react-router-dom'

export default function Chat({id}) {
  return (
    <div className='chat-container'>
      <Link to={`ChatDetail/${id}`} key={id} className='chat-container-link'>
      <div className='chat-box'>
        <div className='chat-dp'><div className='chat-dp-box'><img className='chat-dp-img' src='https://deep-image.ai/_next/static/media/app-info-generator.bf08e63e.webp'/></div></div>

        <div className='chat-detail'>
          <div className='chat-name'>Name</div>
          <div className='chat-msg'>chat</div>
        </div>

        <div className='chat-time'>Time</div>
      </div>
      </Link>
      </div>
  )
}
