/// external dependencies.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/// internal dependencies.

// contexts.

import { CollectionProvider } from '@/contexts/Collection'

// app.

import App from './App.tsx'

// styles.

import './index.css'

/// main.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CollectionProvider>
      <App />
    </CollectionProvider>
  </StrictMode>,
)
