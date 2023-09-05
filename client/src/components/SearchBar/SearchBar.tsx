import { InputStyle } from '../Input/Input'

interface Props {
  query: string
  auxButton?: React.ReactNode
  handleQueryChange: (query: string) => void
}

export function SearchBar({ query, auxButton, handleQueryChange }: Props) {
  return (
    <label className={InputStyle}>
      <input
        type="text"
        placeholder="Ex: What is the meaning of life?"
        onChange={(event) => handleQueryChange(event.target.value)}
        className="text-left
          grow
          pr-2
          bg-transparent	
          focus:outline-none"
        value={query}
      />
      {auxButton}
    </label>
  )
}
