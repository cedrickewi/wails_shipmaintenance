import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { MechanicProvider } from './context/MechanicContext.tsx'
import { ShipProvider } from './context/ShipContext.tsx'
import { IssueProvider } from './context/IssueContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IssueProvider>
      <ShipProvider>
        <MechanicProvider>
          <App />
        </MechanicProvider>
      </ShipProvider>
    </IssueProvider>
  </StrictMode>
)
