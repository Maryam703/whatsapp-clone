import React, { useEffect, useState } from 'react'
import "./ChatBox.css"
import { get, onChildAdded, ref } from 'firebase/database'
import { db } from '../../Config/FirebaseConfig'

export default function ChatBox({ id }) {
    const [messages, setMessages] = useState([])
    let user = JSON.parse(localStorage.getItem("user"))
    console.log(id)

    useEffect(() => {
        setMessages([])
        const unsub = onChildAdded(ref(db, `chatMessage/${id}`), (snap) => {
            setMessages(pri => ([...pri, snap.val()]))
        })


        return () => {
            unsub()
        }
    }, [id])

    return (
        <>
            {messages && messages.map((item) => (
                <div className='chatdetail-chat-box ' key={item.id}>
                    {item.senderId === user.id ? (<div className='chat-pop-sent'>
                        <div className='msg-sent'>
                            {item.fileType === "image" && <div className='media-box'><img className="media-file" src={item.file} /></div>}
                            {item.fileType === "video" && <div className='media-box'><video className="media-file" controls><source src={item.file} /></video></div>}
                            {item.message && <div className='msg-string'>{item.message}</div>}
                            <div className='msg-sent-time'>{item.time}</div>
                        </div>
                    </div>)
                        :
                        (<div className='chat-pop-rcv '>
                            <div className='msg-rcv'>
                            {item.fileType === "image" && <div className='media-box'><img className="media-file" src={item.file} /></div>}
                            {item.fileType === "video" && <div className='media-box'><video className="media-file" controls><source src={item.file} /></video></div>}
                            {item.message && <div className='msg-string'>{item.message}</div>}
                                <div className='msg-rcv-time'>{item.time}</div>
                            </div>
                        </div>)}
                </div>
            ))}
        </>
    )
}
