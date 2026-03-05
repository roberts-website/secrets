/// external dependencies.

import { useRef, useState } from 'react'

import {
  faFileExport,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { Collection } from '@/types/Collection'

// components.

import ErrorModal from '@/components/ErrorModal'
import IconButton from '@/components/IconButton'
import Waiting from '@/components/Waiting'

/// helpers.

function generateFilename(collection: Collection, filename: string | null): string {
  if (filename && filename != 'untitled.secrets')
    return filename

  if (collection.title.length > 0)
    return `${collection.title.replace(/\s+/g, '-')}.secrets`

  return 'untitled.secrets'
}

function saveAsFile(collection: Collection, filename: string | null): void {
  const a    = document.createElement('a')
  const blob = new Blob([JSON.stringify(collection, null, 2)], { type: 'application/json' })

  const url = URL.createObjectURL(blob)
  
  a.href     = url
  a.download = generateFilename(collection, filename)

  a.click()

  URL.revokeObjectURL(url)
}

function isCollection(value: unknown): value is Collection {
  if (!value || typeof value !== 'object')
    return false

  const o = value as Record<string, unknown>

  if (o.version !== 1 || typeof o.title !== 'string' || !Array.isArray(o.secrets))
    return false

  return o.secrets.every(s => 
    s
    && typeof s === 'object'
    && typeof (s as Record<string, unknown>).type === 'string'
    && typeof (s as Record<string, unknown>).id   === 'string'
    && typeof (s as Record<string, unknown>).name === 'string'
  )
}

async function loadFromFile(file: File): Promise<Collection> {
  const text = await file.text()

  const data = JSON.parse(text) as unknown

  if (!isCollection(data))
    throw new Error('Invalid file format')

  return data
}

/// component.

export default function FileManager({
  collection,
  setCollection,
}: {
  collection:    Collection
  setCollection: (collection: Collection) => void
}) {
  const [filename,        setFilename] = useState<string | null>(null)
  const [showImportError, setShowImportError] = useState(false)
  const [importing,       setImporting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    setShowImportError(false)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    e.target.value = ''

    if (!file) return

    setImporting(true)
    setShowImportError(false)

    try {
      const loaded = await loadFromFile(file)

      setCollection(loaded)

      const base = file.name.replace(/\.(secrets|json)$/i, '')
      
      setFilename(file.name.endsWith('.secrets') ? file.name : `${base}.secrets`)
    } catch {
      setShowImportError(true)
    } finally {
      setImporting(false)
    }
  }

  return <div className='flex flex-col md:flex-row gap-4'>
    <input
      className='flex-1'

      type='text'
      
      value      ={collection.title}
      placeholder='collection title.'

      onChange={e => setCollection({
        ...collection,
        title: e.target.value,
      })}
    />

    <input
      ref={fileInputRef}
      type='file'
      accept='.secrets,.json'
      className='hidden'
      onChange={handleFileChange}
    />

    <div className='flex flex-row gap-4'>
      <IconButton
        className='flex-1 md:flex-none'

        icon={faFileImport}

        onClick={handleImportClick}
      >
        import.
      </IconButton>
      
      <IconButton
        className='flex-1 md:flex-none'

        icon={faFileExport}
        
        onClick={() => saveAsFile(collection, filename)}
      >
        export.
      </IconButton>
    </div>

    {showImportError && <ErrorModal
      error  ='this file does not appear to be a secrets file.'
      onClose={() => setShowImportError(false)}
    />}

    {importing && <Waiting zIndex={2} />}
  </div>
}