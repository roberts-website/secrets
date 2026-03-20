/// external dependencies.

import { faFileImport } from '@fortawesome/free-solid-svg-icons'

import {
  useCallback,
  useRef,
  useState,
} from 'react'

/// internal dependencies.

// types.

import type {
  Collection,
  CollectionV2,
} from '@/types/Collection'

import {
  isCollection,
  migrateCollection,
} from '@/types/Collection'

// contexts.

import { useTagSet } from '@/contexts/TagSet'

// components.

import Button from '@/components/Form/Button'

import ErrorModal from '@/components/ErrorModal'
import Waiting    from '@/components/Waiting'

/// helpers.

async function loadFromFile(file: File): Promise<CollectionV2> {
  const text = await file.text()

  const data = JSON.parse(text) as Collection

  if (!isCollection(data))
    throw new Error('Invalid file format')

  return migrateCollection(data)
}

/// component.

export default function Import({
  setCollection,
  setFilename,
}: {
  setCollection: (collection: CollectionV2) => void
  setFilename:   (filename: string) => void
}) {
  const { setTagSet } = useTagSet()

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

      setTagSet(new Set(loaded.secrets.flatMap(secret => secret.tags)))
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
