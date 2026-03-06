/// external dependencies.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/// internal dependencies.

// app.

import App from './App.tsx'

// styles.

import './index.css'

/// main.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
