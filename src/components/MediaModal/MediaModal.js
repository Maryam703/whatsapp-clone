import React, { useState, useEffect } from 'react'
import "./MediaModal.css"
import { get, ref, set } from 'firebase/database'
import { db } from '../../Config/FirebaseConfig'
import Loader from '../Loader/Loader'

export default function MediaModal({ id, showMedia, file, closeMedia }) {
  const [message, setMessage] = useState("")
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(false)
  let user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchingData = async () => {
      const snapShot = await get(ref(db, "chats/" + id));
      setContact({ ...snapShot.val(), id: snapShot.key })
    }
    fetchingData()
  }, [id])

  let d = new Date();
  let hour = d.getHours();
  let minutes = d.getMinutes();

  if (hour < 10) {
    hour = '0' + hour;
  };
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  let time = hour + ' : ' + minutes;


  const Message = {
    message: message,
    time: time,
    senderId: user.id,
    file: file.url,
    fileType: file.type,
  }
  const sendMedia = async () => {
    setLoading(true)
    try {
      await set(ref(db, `chatMessage/${id}/` + Date.now()), Message);
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    setMessage("")
    closeMedia();
  }

  return (
    <>
      {loading && <Loader />}
      <div className={showMedia ? 'media-modal-active' : 'media-modal'}>
        <div className='media-modal-content'>

          <div className='media-icon' onClick={closeMedia}><i class="fa-solid fa-xmark"></i></div>


          {file && file.type === "image" ? (<div className="media-file-box"><img className="media-file" src={file.url} /></div>)
            : (<div className="media-file-box"><video className="media-file" controls><source src={file.url} /></video></div>)}


          <div className='media-msg-box'>
            <input className="media-msg-input" type='text' placeholder='Add a caption' value={message} onChange={(e) => setMessage(e.target.value)} />
            <i className="footer-icon fa-solid fa-paper-plane" onClick={sendMedia} />
          </div>

        </div>
      </div>
    </>
  )
}
