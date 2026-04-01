/// types.

export type SecretBaseV2 = {
  id: string
  
  createdAt: number
  updatedAt: number

  name: string
  tags: readonly string[]
}