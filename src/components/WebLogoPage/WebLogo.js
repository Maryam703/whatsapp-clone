import React from 'react'
import "./WebLogo.css"

export default function WebLogo() {
    return (
        <div className='Weblogo-container'>
            <div className='weblogo-container1'>
                <h1>WhatsApp Web</h1>
                <p>Send and receive messages without keeping your phone online.
                    <br/>
                Use whatsapp on upto 4 linked devices and one phone at the same time.
                </p>
            </div>

            <div className='weblogo-container2'>
                <i className="fa-solid fa-lock"></i>
                Your personal messages are end-to-end encripted.
            </div>
        </div>
    )
}
