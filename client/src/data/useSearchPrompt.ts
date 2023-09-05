import { useCallback, useState } from 'react'
import { GET } from './network'
import { Prompt } from 'prompt-mgmt'

async function fetchPrompts(query: string) {
  const apiURL = `http://localhost:3001/prompts/search?title=${query}`
  const response = await GET(apiURL)
  return (await response.json()) as Prompt[]
}

export function useSearchPrompt() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<Prompt[]>([])
  const [error, setError] = useState<Error>()
  let filterTimeout: string | number | NodeJS.Timeout | undefined

  async function fetch(query: string) {
    clearTimeout(filterTimeout)
    setIsLoading(true)
    filterTimeout = setTimeout(async () => {
      try {
        const data = await fetchPrompts(query)
        setData(data)
      } catch (error) {
        setError(error as Error)
      }
      setIsLoading(false)
    }, 200)
  }
  const memoizedFetch = useCallback(fetch, [])

  return { isLoading, data, error, fetch: memoizedFetch }
}
