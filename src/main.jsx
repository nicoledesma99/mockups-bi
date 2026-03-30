import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Frigorifico from './pages/Frigorifico'
import Salud from './pages/Salud'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frigorifico" element={<Frigorifico />} />
        <Route path="/salud" element={<Salud />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
