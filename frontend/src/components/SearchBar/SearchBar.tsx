import './SearchBar.css'

interface Props {
  query: string
  clearButton?: React.ReactNode
  handleQueryChange: (query: string) => void
}

export function SearchBar({ query, clearButton, handleQueryChange }: Props) {
  return (
    <label className="SearchBarContainer">
      <input
        type="text"
        placeholder="Ex: What is the meaning of life?"
        onChange={(event) => handleQueryChange(event.target.value)}
        className="SearchBar"
        value={query}
      />
      {clearButton}
    </label>
  )
}
