import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <WorkoutsContextProvider WorkoutsContextProvider >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WorkoutsContextProvider >
  </AuthContextProvider>
)
