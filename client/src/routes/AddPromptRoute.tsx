import { NavLink } from 'react-router-dom'
import './AddPromptRoute.css'
import { useState } from 'react'
import { useCreatePrompt } from '../data/useCreatePrompt'

export function AddPromptRoute() {
  const [formState, setFormState] = useState({
    title: '',
    content: '',
  })
  const { create } = useCreatePrompt()

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    console.log(formState)
    console.log('submit')
    create({ ...formState, authorId: 1 }) // TODO: use real author id
  }

  function handleFormChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  return (
    <div>
      <nav className="mb-8">
        <NavLink className="text-left font-light" to="/">
          Back
        </NavLink>
        <h1 className="text-xl font-semibold">Add a prompt</h1>
      </nav>
      <form>
        <Input
          placeholder="Prompt title"
          name="title"
          value={formState.title}
          label="Title"
          handleOnChange={handleFormChange}
        />
        <Textarea
          name="content"
          value={formState.content}
          label="Prompt"
          placeholder="Prompt content"
          handleOnChange={handleFormChange}
        />
        <button
          className="
          bg-indigo-500
          text-white
          ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 
          hover:bg-indigo-600 hover:ring-2 hover:ring-indigo-500 hover:ring-opacity-70 
          outline-none
          transition
          "
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  )
}

export const URL = '/prompts/add'

function Input({
  handleOnChange,
  name,
  value,
  placeholder,
  label,
}: {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  value: string
  placeholder?: string
  label?: string
}) {
  return (
    <span className="text-left mb-5">
      <label htmlFor="prompt${name}}">{label}</label>
      <input
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

function Textarea({
  handleOnChange,
  name,
  value,
  placeholder,
  label,
}: {
  handleOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  name: string
  value: string
  placeholder?: string
  label?: string
}) {
  return (
    <span className="text-left mb-5">
      <label htmlFor="prompt${name}}">{label}</label>
      <textarea
        id="prompt${name}}"
        placeholder={placeholder}
        onChange={(event) => handleOnChange(event)}
        className="text-left w-96 px-2 py-2 flex items-center grow border rounded-lg border-gray-600 focus-within:ring-1 
        focus-within:border-indigo-500 focus-within:ring-opacity-70 focus-within:ring-indigo-500 focus:outline-none
        dark:bg-neutral-900
        transition"
        name={name}
        value={value}
      />
    </span>
  )
}
