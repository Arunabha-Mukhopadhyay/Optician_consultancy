import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '10px',
            fontSize: '14px',
          },
          success: {
            style: { background: '#1B3A6B', color: 'white' },
            iconTheme: { primary: '#E87722', secondary: 'white' },
          },
          error: {
            style: { background: '#ef4444', color: 'white' },
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>,
)
