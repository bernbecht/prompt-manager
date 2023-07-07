import { useState } from 'react'
import { GET } from './network'

async function fetchPrompts(query: string) {
  const apiURL = `http://localhost:3001/searchPrompt?title=${query}`
  const response = await GET(apiURL)
  return response
}

export function useSearchPrompt() {
  // in a bigger app, we should move the loading state to a global state management library like redux
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState([])
  const [error, setError] = useState<Error>()
  let filterTimeout: number

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

  return { isLoading, data, error, fetch }
}
