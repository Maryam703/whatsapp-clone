import React, { useEffect, useState } from 'react'
import "./Userdashboard.css"
import Sidebar from "../Sidebar/Sidebar"
import {db, storage} from "../../Config/FirebaseConfig"
import { update, ref, get} from 'firebase/database'
import { getDownloadURL, uploadBytes, ref as storageRef} from 'firebase/storage'
import Loader from '../Loader/Loader'

export default function Userdashboard() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [changeProfile, setChangeProfile] = useState(false);
  const [file, setFile] = useState(user && user.file);
  const [name, setName] = useState(user && user.name);
  const [about, setAbout] = useState(user && user.about);
  const [loading, setLoading] = useState(false)

  const editYourName = () => {
    setEditName(true)
  }
  const editaboutYOu = () => {
    setEditAbout(true)
  }

  const updateUser = async() => {
    if (editName) {
      setLoading(true)
      try {
        let docRef = ref(db, `users/${user.id}`);
        await update(docRef, {name: name})
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
      setEditName(false)
    }
    if (editAbout) {
      setLoading(true)
      try {
        let docRef = ref(db, `users/${user.id}`);
        await update(docRef, {about: about})
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
      setEditAbout(false)
    }
    if (file) {
      setLoading(true)
      try {
        let docRef = ref(db, `users/${user.id}`);
        await update(docRef, {file: file});
        
       const snapShot = await get(docRef);
       const userSnap = snapShot.val()
       localStorage.setItem("user", JSON.stringify(userSnap))

      } catch (error) {
        console.error(error)
      }
      setLoading(false)
      setChangeProfile(false);
    }
  }

  const changeDP = () => {
    const input = document.getElementById("file-edit-input")
    input.click()
    setChangeProfile(true)
  }
   const setFileUpload = async (file) => {
    setLoading(true)
        try {
            const date = Date.now();
            const fileRef = storageRef(storage, date.toString());
            await uploadBytes(fileRef, file)

            const url = await getDownloadURL(fileRef);
            setFile(url)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

  
  return (
    <>
    {loading && <Loader/>}
    <div className='user-dashboard-container'>
      <div className='dashboard-sidebar'>
        <Sidebar />
      </div>

      <div className='user-dashboard-form'>
        <div className='dashboard-head'>
        <p>Profile</p>
        {(editName || editAbout || changeProfile) && <button onClick={updateUser}>Done</button>}
        </div>
        <div className='user-profile-section'>
          {file ? <div className='user-profile'><img src={file} /></div> : 
          <div className='user-profile'><img src="https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" /></div>}

          <div className='edit-dp' onClick={changeDP}>Edit</div>
          <input id='file-edit-input' type='file' onChange={(e)=> setFileUpload(e.target.files[0])}/>
        </div>

        <div className='user-name-section'>
          <label>Your name</label>
          {editName ? (<div className='user-info'><input className='user-name-input' type="text" value={name} onChange={(e) => setName(e.target.value)} /> </div>) : (
            <div className='user-info'>
              <div className='user-info-name'>{name}</div>
              <div className='user-info-edit' onClick={editYourName}><i class="fa-solid fa-pen"></i></div>
            </div>)}
        </div>

        <div className='user-about-section'>
          <label>About</label>
          {editAbout ? (<div className='user-info'><input className='user-about-input' type="text" value={about} onChange={(e) => setAbout(e.target.value)} /> </div>) : (
            <div className='user-info'>
              <div className='user-info-about'>{about}</div>
              <div className='user-info-edit' onClick={editaboutYOu}><i class="fa-solid fa-pen"></i></div>
            </div>)}
        </div>
      </div>
    </div>
    </>
  )
}
