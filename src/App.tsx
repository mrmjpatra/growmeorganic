import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Dashboard from './components/Dashboard'



function App() {
  
  return (
    <>
      <div>
        <BrowserRouter>
          
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
