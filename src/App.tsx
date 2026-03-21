/// internal dependencies.

// components.

import FileManager from '@/components/FileManager'
import Secrets     from '@/components/Secrets'

/// component.

function App() {
  return <div className='flex flex-col gap-8 w-95/100 md:w-3/5 mx-auto py-4 h-screen'>
    <h1>robert's secrets.</h1>

    <FileManager />

    <Secrets />
  </div>
}

export default App
