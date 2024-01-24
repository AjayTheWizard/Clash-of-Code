import '@/styles/globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { io } from 'socket.io-client'

export const socket = io('http://localhost:3000')
console.log(socket)

// prettier-ignore
ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
