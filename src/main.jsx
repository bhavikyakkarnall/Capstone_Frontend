import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './components/Login.jsx'
import Stack from '@mui/material/Stack';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    
  </React.StrictMode>,
)
