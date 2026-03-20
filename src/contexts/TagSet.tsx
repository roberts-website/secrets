/// external dependencies.

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  
  createContext,
  useContext,
  useState,
} from 'react'

/// types.

type TagSetContextValue = {
  tagSet:    Set<string>
  setTagSet: Dispatch<SetStateAction<Set<string>>>
}

/// context.

const TagSetContext = createContext<TagSetContextValue | null>(null)

export function TagSetProvider({
  children,
}: {
  children: ReactNode
}) {
  const [tagSet, setTagSet] = useState<Set<string>>(() => new Set())

  return (
    <TagSetContext.Provider value={{ tagSet, setTagSet }}>
      {children}
    </TagSetContext.Provider>
  )
}

export function useTagSet() {
  const ctx = useContext(TagSetContext)

  if (!ctx) throw new Error('useTagSet must be used within TagSetProvider.')

  return ctx
}
