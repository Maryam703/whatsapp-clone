import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Link } from 'react-router-dom'
import { ref, get } from 'firebase/database'
import { db } from '../../Config/FirebaseConfig'

export default function Chat({ id, member1, member2 }) {
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

  }, [member1, member2])



  return (
    <div className='chat-container'>
      <Link to={`ChatDetail/${id}`} key={id} className='chat-container-link'>
        <div className='chat-box'>
          <div className='chat-dp'><div className='chat-dp-box'><img className='chat-dp-img' src={newUser.file ? newUser.file : 'https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg'} /></div></div>

          <div className='chat-detail'>
            {newUser.name && <div className='chat-name'>{newUser.name}</div>}
            <div className='chat-msg'>chat</div>
          </div>

          <div className='chat-time'>Time</div>
        </div>
      </Link>
    </div>
  )
}

