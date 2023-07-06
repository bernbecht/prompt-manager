import { useEffect } from 'react'
import { capitalizeFirstLetter } from '../../utils'
import './SuggestionBox.css'
import { useGetPrompt } from '../../data/useGetPrompt'
import { Prompt } from '@shared-types'
interface Props {
  query: string
  open: boolean
  loading?: boolean
  handleItemClick: (selectedItem: string) => void
}

export function SuggestionsBox({ query, open, handleItemClick }: Props) {
  const { isLoading, data: items, error, fetch: promptFetch } = useGetPrompt()

  useEffect(() => {
    const dataFetch = async () => {
      await promptFetch(query)
    }
    if (query !== '') {
      dataFetch()
    }
  }, [query])

  if (query === '' || !open) {
    return null
  }

  const suggestionItems =
    items.length === 0 ? (
      <p>No results</p>
    ) : (
      items.map((prompt: Prompt) => {
        return (
          <li
            tabIndex={0}
            className="SuggestionItem"
            key={prompt.id}
            onClick={(event) =>
              handleItemClick(event.currentTarget.textContent || '')
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleItemClick(event.currentTarget.textContent || '')
              }
            }}
          >
            {capitalizeFirstLetter(prompt.title)}
          </li>
        )
      })
    )

  return (
    <ul className="SuggestionBox">
      {isLoading ? <p>Loading...</p> : suggestionItems}
      {error && (
        <p>☹️ Our system isn't available right now. Please try again later</p>
      )}
    </ul>
  )
}
