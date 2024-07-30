import React, { useState } from 'react'
import "./MediaModal.css"

export default function MediaModal({showMedia, file, closeMedia}) {
    const [message, setMessage] = useState("")

    const sendMedia = () => {
        closeMedia();
    }

  return (
    <div className={showMedia ? 'media-modal-active': 'media-modal'}>
      <div className='media-modal-content'>

        <div className='media-icon' onClick={closeMedia}><i class="fa-solid fa-xmark"></i></div>

        
        <div className="media-file-box"><video className="media-file" controls><source src={file}/></video></div> 
        

        <div className='media-msg-box'>
            <input className="media-msg-input" type='text' placeholder='Add a caption' value={message} onChange={(e)=> setMessage(e.target.value)}/>
            <i className="footer-icon fa-solid fa-paper-plane" onClick={sendMedia}/> 
        </div>

      </div>
    </div>
  )
}
