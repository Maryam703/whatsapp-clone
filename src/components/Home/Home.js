import React, { useState } from 'react'
import "./Home.css"
import Chat from '../Chat/Chat'

export default function Home() {
  const [search, setSearch] = useState("")
  const [startChat, setStartchat] = useState(false);
  const [whatsAppNum, setWhatsAppNum] = useState("");

  const openContact = () => {
    setStartchat(true)
  }
  const startNewChat = () => {
    setStartchat(false)
  }
  return (
    <div className='home-container'>
      <div className='home-container-head'>
        <div className='chat-para'>
          <p>Chats</p>
        </div>
        <div className="home-container-icons">
          <i onClick={openContact} className="fa-solid fa-plus" />
          <i className="fa-solid fa-ellipsis-vertical" />
        </div>
      </div>

      {startChat ? (<div className='search-input-box'>
        <input type='text' placeholder='Search Name or Number' value={whatsAppNum} onChange={(e) => setWhatsAppNum(e.target.value)} />
        {whatsAppNum && <div className='search-button' onClick={startNewChat}>Start Chat<i className="search-button-icon fa-solid fa-paper-plane" /></div>}
      </div>) 
      : 
      (<div className='home-container-head-input'>
        <input type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} />
        <i className="fa-solid fa-magnifying-glass" />
      </div>)}

      <div className="home-container-chat">
        <Chat
          id="1234"
          file="file"
          name="Name"
          time="time" />
      </div>
    </div>
  )
}
