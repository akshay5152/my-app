import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Calendar from './Calendar.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  )
}

export default App