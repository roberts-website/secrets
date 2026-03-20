/// external dependencies.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/// internal dependencies.

// contexts.

import { TagSetProvider } from '@/contexts/TagSet'

// app.

import App from './App.tsx'

// styles.

import './index.css'

/// main.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TagSetProvider>
      <App />
    </TagSetProvider>
  </StrictMode>,
)
