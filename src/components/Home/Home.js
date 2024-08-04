import React, { useEffect, useState } from 'react'
import "./Home.css"
import Chat from '../Chat/Chat'
import { db } from '../../Config/FirebaseConfig';
import { child, equalTo, get, orderByChild, push, query, ref, set } from 'firebase/database';
import Loader from '../Loader/Loader';

export default function Home() {
  const [startChat, setStartchat] = useState(false);
  const [whatsAppNum, setWhatsAppNum] = useState("");
  const [searchContact, setSearchContact] = useState(null);
  const [search, setSearch] = useState("");
  const [allChats, setAllChats] = useState(null);
  const [loading, setLoading] = useState(false)
  let user = JSON.parse(localStorage.getItem("user"))
  

  useEffect(() => {
    const fetchingData = async () => {
      const snapShot = await get(ref(db, `userChats/${user.id}`))
      if(snapShot.exists()){
      const chatObj = snapShot.val()
      let chatsArr = [];
      const chatKeys = Object.keys(chatObj)

      const dataSnaps = await Promise.all(chatKeys.map((key)=>get(ref(db, `chats/${key}`))))

      dataSnaps.forEach(snap =>{
        chatsArr.push({...snap.val(),id:snap.key})
      })
      setAllChats(chatsArr)

      }
    }
    fetchingData()
  }, [startChat])


  const openContact = () => {
    setStartchat(true)
  }
  const searchChat = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const docRef = query(ref(db, "users/"), orderByChild('name'), equalTo(whatsAppNum));
      const snapShots = await get(docRef)
      let searchChat ;
      snapShots.forEach((child) => {
        searchChat = { key: child.key, ...child.val() };
      });
      setSearchContact(searchChat)
      setLoading(false)

    } catch (error) {
      console.error(error)
    }
  }

  const members = {
    member1: searchContact && searchContact.id,
    member2: user.id,
  }
  const startNewChat = async () => {
    setLoading(true)
    try {

      // Get a key for a new Post.
      const newChatKey = push(child(ref(db), 'chats')).key;
      await set(ref(db, "chats/"+newChatKey), members)
      
      await set(ref(db, "userChats/"+user.id+"/"+newChatKey), true)

    } catch (error) {
      console.error(error)
    }
    setLoading(false)
    setStartchat(false)
  }


  return (
    <>
     {loading && <Loader/>}
    <div className='home-container'>
      <div className='home-container-head'>
        <div className='chat-para'>
          <p>Chats</p>
        </div>
        <div className="home-container-icons">
          <i onClick={openContact} className="fa-solid fa-plus" />
        </div>
      </div>

      {startChat ? (<div className='search-input-box'>
        <div className='search-input'>
          <input type='text' placeholder='Search Name or Number' value={whatsAppNum} onChange={(e) => setWhatsAppNum(e.target.value)} />
          <i className="fa-solid fa-magnifying-glass" onClick={searchChat} />
        </div>
        {searchContact &&
          <div className='search-contact'>
            <div className='search-profile'><div className='search-dp'><img src={searchContact.file} /></div></div>
            <div className='search-title'>{searchContact.name}</div>
            <div className='search-button' onClick={startNewChat}> <i className="fa-solid fa-paper-plane" /> </div>
          </div>
        }
      </div>)
        :
        (<div className='home-container-head-input'>
          <input type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} />
          <i className="fa-solid fa-magnifying-glass" />
        </div>)}

      {allChats && allChats.map((chat) => (
        <div className="home-container-chat">
          <Chat
            id={chat.id} member1={chat.member1} member2={chat.member2} />
        </div>
      ))}
    </div>
    </>
  )
}
