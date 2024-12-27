import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Home from './components/Home/Home'
import Audio from './components/Home/Audio'


function App() {


  return (
    <div className='h-screen'>
    <Routes>
      <Route path='/' element={<Login/>}/>
      {/* <Route path='/home' element={<Home/>}/> */}
    </Routes>
    {/* <Audio/> */}
    </div>
  )
}

export default App
