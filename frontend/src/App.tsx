import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'

// Pages
import IndexPage from './pages/IndexPage'
import AdminPage from "./pages/Admin/AdminPage"
import LoginPage from './pages/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/admin-view' element={<AdminPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
