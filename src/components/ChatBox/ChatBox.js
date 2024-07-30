import React from 'react'
import "./ChatBox.css"

export default function ChatBox() {
    return (
        <div className='chatdetail-chat-box'>
            <div className='chat-pop-sent'>
                <div className='msg-sent'>Sent message show here
                    <div className='msg-sent-time'>time</div>
                </div>
            </div>

            <div className='chat-pop-rcv'>
                <div className='msg-rcv'>Received message show here
                    <div className='msg-rcv-time'>time</div>
                </div>
            </div>
        </div>
    )
}
