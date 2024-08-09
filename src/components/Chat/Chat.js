import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Link } from 'react-router-dom'
import { ref, get } from 'firebase/database'
import { db } from '../../Config/FirebaseConfig'

export default function Chat({ id, member1, member2, lastMessage }) {
  let user = JSON.parse(localStorage.getItem('user'))
  const [newUser, setNewUser] = useState({})

  useEffect(() => {
    const getOppoUser = async () => {
      if (member1 !== user.id) {
        const docRef = ref(db, `users/${member1}`);
        const snapShot = await get(docRef);
        if (snapShot.exists()) {
          const user = snapShot.val()
          setNewUser(user)
        }
      }
      if (member2 !== user.id) {
        const docRef = ref(db, `users/${member2}`);
        const snapShot = await get(docRef);
        if (snapShot.exists()) {
          const user = snapShot.val()
          setNewUser(user)
        }
      }
    }
    getOppoUser()

  }, [id, member1, member2, lastMessage])

  return (
    <div className='chat-container'>
      <Link to={`ChatDetail/${id}`} key={id} className='chat-container-link'>
        <div className='chat-box'>
          <div className='chat-dp'><div className='chat-dp-box'><img className='chat-dp-img' src={newUser && newUser.file ? newUser.file : 'https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg'} /></div></div>

          <div className='chat-detail'>
            {newUser.name && <div className='chat-name'>{newUser.name}</div>}
            {lastMessage && lastMessage.message && <div className='chat-msg'>{lastMessage.message}</div>}
            {lastMessage && lastMessage.fileType === "image" && <div className='chat-msg'><i class="fa-regular fa-image"></i> photo</div>}
            {lastMessage && lastMessage.fileType === "video" && <div className='chat-msg'><i class="fa-solid fa-video"></i> video</div>}
          </div>

          {lastMessage && <div className='chat-time'>{lastMessage.time}</div>}
        </div>
      </Link>
    </div>
  )
}

