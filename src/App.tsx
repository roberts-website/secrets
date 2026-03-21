/// internal dependencies.

// contexts.

import { useCollection } from '@/contexts/Collection'

// components.

import FileManager from '@/components/FileManager'
import Secrets     from '@/components/Secrets'

/// component.

function App() {
  const { collection, setCollection } = useCollection()

  return <div className='flex flex-col gap-8 w-95/100 md:w-3/5 mx-auto py-4 h-screen'>
    <h1>robert's secrets.</h1>

    <FileManager
      collection   ={collection}
      setCollection={setCollection}
    />

    <Secrets
      collection   ={collection}
      setCollection={setCollection}
    />
  </div>
}

export default App
