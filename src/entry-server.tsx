import React from 'react'
import ReactDOMServer from 'react-dom/server'
import AppServer from './App-server'

export function render(url: string) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <AppServer />
    </React.StrictMode>
  )
  
  return { html }
}
