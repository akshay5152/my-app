import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Calendar from './Calendar.jsx'

function App() {
  return (
    <Routes>
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  )
}

export default App