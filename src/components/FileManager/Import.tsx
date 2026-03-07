/// external dependencies.

import { faFileImport } from '@fortawesome/free-solid-svg-icons'

import {
  useCallback,
  useRef,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type { Collection } from '@/types/Collection'

// components.

import ErrorModal from '@/components/ErrorModal'
import Button from '@/components/Form/Button'
import Waiting    from '@/components/Waiting'

/// helpers.

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

export default function Import({
  setCollection,
  setFilename,
}: {
  setCollection: (collection: Collection) => void
  setFilename:   (filename: string) => void
}) {
  const [importing,       setImporting      ] = useState(false)
  const [showImportError, setShowImportError] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = useCallback(() => {
    setShowImportError(false)
    fileInputRef.current?.click()
  }, [])


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

  return <>
    {showImportError && <ErrorModal
      error  ='this file does not appear to be a secrets file.'
      onClose={() => setShowImportError(false)}
    />}

    {importing && <Waiting />}

    <input
      accept   ='.secrets,.json'
      className='hidden'
      ref      ={fileInputRef}
      type     ='file'

      onChange={handleFileChange}
    />

    <Button
      className='flex-1 md:flex-none'
      icon     ={faFileImport}

      onClick={handleImportClick}
    >
      import.
    </Button>
  </>
}