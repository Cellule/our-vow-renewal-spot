import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if we're hydrating existing SSR content
const container = document.getElementById('root')
if (container) {
  if (container.hasChildNodes()) {
    // Hydrate existing SSR content
    ReactDOM.hydrateRoot(container, <App />)
  } else {
    // Create new root if no SSR content
    ReactDOM.createRoot(container).render(<App />)
  }
}
