import { useState } from 'react'
import { GET } from './network'
import { Prompt } from 'prompt-mgmt'

export async function getPrompt(id: string): Promise<Prompt> {
  const apiURL = `http://localhost:3001/prompts/${id}`
  const response = await GET(apiURL)
  return (await response.json()) as Prompt
}

export function useGetPrompt() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<Prompt>()
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
