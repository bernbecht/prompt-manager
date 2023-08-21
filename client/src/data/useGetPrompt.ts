import { useState } from 'react'
import { GET } from './network'

export async function getPrompt(id: string) {
  const apiURL = `http://localhost:3001/prompts/${id}`
  const response = await GET(apiURL)
  return response
}

export function useGetPrompt() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState([])
  const [error, setError] = useState<Error>()

  async function fetch(id: string) {
    try {
      const response = await getPrompt(id)
      setData(response)
    } catch (error) {
      console.log(error)
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return { fetch, isLoading, data, error }
}
