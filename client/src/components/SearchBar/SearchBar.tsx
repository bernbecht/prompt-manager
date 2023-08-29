interface Props {
  query: string
  auxButton?: React.ReactNode
  handleQueryChange: (query: string) => void
}

export function SearchBar({ query, auxButton, handleQueryChange }: Props) {
  return (
    <label
      className="w-96 px-2 py-2
        flex items-center 
        border rounded-lg border-indigo-400 
        focus-within:ring-1 focus-within:ring-indigo-500 focus-within:ring-opacity-50
        transition"
    >
      <input
        type="text"
        placeholder="Ex: What is the meaning of life?"
        onChange={(event) => handleQueryChange(event.target.value)}
        className="text-left
          grow
          py-2
          focus:outline-none"
        value={query}
      />
      {auxButton}
    </label>
  )
}
