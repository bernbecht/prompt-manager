import { useState } from 'react'
import { POST } from './network'
import { NewPrompt } from '../types'

export const useCreatePrompt = () => {
  // in a bigger app, we should move the loading state to a global state management library like redux
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  async function create(data: NewPrompt) {
    setIsLoading(true)
    try {
      const apiURL = `http://localhost:3001/prompts`
      const response = await POST(apiURL, data)
      return response
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, create }
}
