import { useNavigate, useOutlet } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import { useEffect } from 'react';

function App() {
  const outlet = useOutlet()
  const navigate = useNavigate()

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      navigate("/register")
    }
  }, [])

  return (
   <>
   <div className='main-container'>
    <Sidebar className="side-bar"/>
   <Home className="side-section"/>
   <div className="outlet-section">{outlet}</div>
   </div>
   </>
  );
}

export default App;
