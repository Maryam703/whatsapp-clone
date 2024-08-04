import React, { useEffect, useState } from 'react'
import "./ChatDetail.css"
import { useParams } from 'react-router-dom'
import MediaModal from '../MediaModal/MediaModal'
import ChatBox from '../ChatBox/ChatBox'
import { db } from '../../Config/FirebaseConfig'
import { get, ref, set } from 'firebase/database'
import { storage } from '../../Config/FirebaseConfig'
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"

export default function ChatDetail({ }) {
    const [contact, setContact] = useState(null)
    const [message, setMessage] = useState("")
    const [file, setFile] = useState(null)
    const [showMedia, setShowMedia] = useState(false)
    const [newUser, setNewUser] = useState(null);
    const [loading, setLoading] = useState(false)
    let user = JSON.parse(localStorage.getItem("user"))
    const { id } = useParams()

    useEffect(() => {
        const fetchingData = async () => {
            const snapShot = await get(ref(db, "chats/" + id));
            setContact({ ...snapShot.val(), id: snapShot.key })
        }
        fetchingData()
    }, [id])

    useEffect(() => {
        const fetchingData = async () => {
            closeMedia()
        }
        fetchingData()
    }, [id])

    useEffect(() => {
        const getUser = async () => {
            if (contact && contact.member1 !== user.id) {
                const docRef = ref(db, `users/${contact.member1}`);
                const snapShot = await get(docRef);
                if (snapShot.exists()) {
                    const user = snapShot.val()
                    setNewUser(user)
                }
            }
            if (contact && contact.member2 !== user.id) {
                const docRef = ref(db, `users/${contact.member2}`);
                const snapShot = await get(docRef);
                if (snapShot.exists()) {
                    const user = snapShot.val()
                    setNewUser(user)
                }
            }
        }
        getUser()

    }, [contact])

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
        file: "",
        fileType: "text",
    }
    const sendMessage = async () => {
        setLoading(true)
        try {
            await set(ref(db, `chatMessage/${id}/` + Date.now()), Message);
            if (user.id !== contact.member1) {
                await set(ref(db, "userChats/" + contact.member1 + "/" + id), true)
                console.log("hii")
            }

            if (user.id !== contact.member2) {
                await set(ref(db, "userChats/" + contact.member2 + "/" + id), true)
            }
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
        setMessage("")  
    }

    const setFileUpload = async (file) => {
        setLoading(true)
        try {
            const date = Date.now();
            const fileRef = storageRef(storage, date.toString());
            if (file.type.startsWith("video/")) {
                const fileType = "video";
                await uploadBytes(fileRef, file)
                const url = await getDownloadURL(fileRef);
                setFile({ url, type: fileType })
                setLoading(false)
            }
            if (file.type.startsWith("image/")) {
                const fileType = "image";
                await uploadBytes(fileRef, file)
                const url = await getDownloadURL(fileRef);
                setFile({ url, type: fileType })
                setLoading(false)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        {loading && <loading/>}
            <div className='chat-detail-container'>
                <div className='header-box'>
                    <div className='header-dp'>
                        <div className='header-dp-box'>
                            {newUser && <img className='header-dp-img' src={newUser.file ? newUser.file : 'https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg'} />}
                        </div>
                    </div>
                    <div className='header-detail'>
                        {newUser && <div className='header-name'>{newUser.name}</div>}
                    </div>
                    <div className='header-icon'><i class="fa-solid fa-phone"></i></div>
                </div>

                <div className='middle-comp'>
                    <ChatBox id={id} />
                </div>

                <div className='footer'>
                    <div className='text-input'>
                        <input type='text' placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <div className='file-input'>
                        <input id="input" accept='video/*, image/*' type='file' onChange={(e) => setFileUpload(e.target.files[0])} />
                        {message ? <i onClick={sendMessage} class="footer-icon fa-solid fa-paper-plane" /> : <i className="footer-icon fa-solid fa-camera-retro" onClick={selectFile} />}
                    </div>
                </div>
            </div>
            {showMedia && <MediaModal id={id} file={file} showMedia={showMedia} closeMedia={closeMedia} />}
        </>

    )
}