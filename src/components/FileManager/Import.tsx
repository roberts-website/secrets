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

  return o.secrets.every(s => {
    const sec = s as Record<string, unknown>
    if (!sec || typeof sec !== 'object') return false
    if (typeof sec.id !== 'string' || typeof sec.name !== 'string' || !Array.isArray(sec.tags)) return false
    if (sec.type === 'plain-text') return typeof sec.value === 'string'
    if (sec.type === 'ssh-key') return typeof sec.public === 'string' && typeof sec.private === 'string'
    return false
  })
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