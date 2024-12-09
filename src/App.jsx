import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Home from './components/Home/Home'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='home' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
