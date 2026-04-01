/// external dependencies.

import { faFileExport } from '@fortawesome/free-solid-svg-icons'

/// internal dependencies.

// types.

import type { CollectionV2 } from '@/types/Collection/index'

// contexts.

import { useCollection } from '@/contexts/Collection'

// components.

import Button from '@/components/Form/Button'

/// helpers.

function generateFilename(collection: CollectionV2, filename: string | null): string {
  if (filename && filename != 'untitled.secrets')
    return filename

  if (collection.title.length > 0)
    return `${collection.title.replace(/\s+/g, '-')}.secrets`

  return 'untitled.secrets'
}

function saveAsFile(collection: CollectionV2, filename: string | null): void {
  const a    = document.createElement('a')
  const blob = new Blob([JSON.stringify(collection, null, 2)], { type: 'application/json' })

  const url = URL.createObjectURL(blob)
  
  a.href     = url
  a.download = generateFilename(collection, filename)

  a.click()

  URL.revokeObjectURL(url)
}

/// component.

export default function Export({
  filename,
}: {
  filename: string | null
}) {
  const { collection } = useCollection()

  return <Button
    className='flex-1 md:flex-none'
    icon     ={faFileExport}

    onClick={() => saveAsFile(collection, filename)}
  >
    export.
  </Button>
}