export function Input({
  handleOnChange,
  name,
  value,
  placeholder,
  label,
  textearea = false,
}: {
  handleOnChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  name: string
  value: string
  placeholder?: string
  label?: string
  textearea?: boolean
}) {
  const Input = textearea ? 'textarea' : 'input'
  return (
    <span className="text-left mb-5">
      <label htmlFor="prompt${name}}">{label}</label>
      <Input
        id="prompt${name}}"
        type="text"
        placeholder={placeholder}
        onChange={(event) => handleOnChange(event)}
        className="text-left w-96 px-2 py-2 flex items-center grow border rounded-lg border-gray-600 focus-within:ring-1 
        focus-within:border-indigo-500 focus-within:ring-opacity-70 focus-within:ring-indigo-500 focus:outline-none
        transition
        dark:bg-neutral-900"
        name={name}
        value={value}
      />
    </span>
  )
}
