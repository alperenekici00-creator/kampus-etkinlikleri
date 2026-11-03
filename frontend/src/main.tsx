import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { EventsProvider } from './context/EventsContext'
import App from './App.tsx'
import './index.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventsProvider>
        <App />
      </EventsProvider>
    </BrowserRouter>
  </StrictMode>,
)
