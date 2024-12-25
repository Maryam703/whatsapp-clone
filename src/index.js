import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ChatDetail from './components/ChatDetail/ChatDetail';
import WebLogo from './components/WebLogoPage/WebLogo';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Userdashboard from "./components/Userdashboard/Userdashboard"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
   <Route path='/register' element={<Register/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/' element={<App/> }>
    <Route path='' element={<WebLogo/>}/> 
    <Route path='ChatDetail/:id' element={<ChatDetail/>}/>
    <Route path='/Userdashboard' element={<Userdashboard />} />
    </Route>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>
);

