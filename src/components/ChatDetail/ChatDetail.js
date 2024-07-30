import React, { useEffect, useState } from 'react'
import "./ChatDetail.css"
import { useParams } from 'react-router-dom'
import MediaModal from '../MediaModal/MediaModal'
import ChatBox from '../ChatBox/ChatBox'

export default function ChatDetail() {
    const [message, setMessage] = useState("")
    const [file, setFile] = useState(null)
    const [showMedia, setShowMedia] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        if (file != null) {
            setShowMedia(true)
        }
    }, [file])

    const closeMedia = () => {
        setFile(null)
        setShowMedia(false)
    }

    const selectFile = () => {
        const input = document.getElementById('input');
        input.click();
    }
    return (
        <>
            <div className='chat-detail-container'>
                <div className='header-box'>
                    <div className='header-dp'>
                        <div className='header-dp-box'>
                            <img className='header-dp-img' src='https://deep-image.ai/_next/static/media/app-info-generator.bf08e63e.webp' />
                        </div>
                    </div>
                    <div className='header-detail'>
                        <div className='header-name'>name</div>
                    </div>
                    <div className='header-icon'><i class="fa-solid fa-phone"></i></div>
                </div>

                <div className='middle-comp'>
                    <ChatBox />
                </div>

                <div className='footer'>
                    <div className='text-input'>
                        <input type='text' placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <div className='file-input'>
                        <input id="input" accept='video/*' type='file' onChange={(e) => setFile(e.target.files[0])} />
                        {message ? <i class="footer-icon fa-solid fa-paper-plane" /> : <i className="footer-icon fa-solid fa-camera-retro" onClick={selectFile} />}
                    </div>
                </div>
            </div>
            {showMedia && <MediaModal file={file} showMedia={showMedia} closeMedia={closeMedia} />}
        </>

    )
}