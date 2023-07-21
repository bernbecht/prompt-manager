import { useState } from 'react'
import './App.css'
import { SuggestionsBox } from './components/SuggestionBox/SuggestionsBox'
import { SearchBar } from './components/SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'

function App() {
  const [query, setQuery] = useState<string>('')
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  function handleSuggestionClick(selectedPokemon: string) {
    setQuery(selectedPokemon)
    setIsSuggestionBoxOpen(false)
  }

  async function handleQueryChange(query: string) {
    setQuery(query)
    setIsSuggestionBoxOpen(true)
  }

  const clearButton = (
    <button
      onClick={() => {
        setQuery('')
        setIsSuggestionBoxOpen(false)
      }}
    >
      Clear
    </button>
  )

  const addButton = (
    <button
      onClick={() => {
        navigate('/prompt/add')
      }}
    >
      + Add
    </button>
  )

  return (
    <div>
      <h1>Search your prompt</h1>
      <SearchBar
        query={query}
        handleQueryChange={handleQueryChange}
        auxButton={query ? clearButton : addButton}
      />
      <SuggestionsBox
        query={query}
        open={isSuggestionBoxOpen}
        handleItemClick={handleSuggestionClick}
      />
    </div>
  )
}

export default App
