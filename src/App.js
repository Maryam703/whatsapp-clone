import { useOutlet } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const outlet = useOutlet()
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
