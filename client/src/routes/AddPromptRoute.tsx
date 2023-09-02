import { NavLink } from 'react-router-dom'
import './AddPromptRoute.css'
import { useState } from 'react'
import { useCreatePrompt } from '../data/useCreatePrompt'
import { Input } from '../components/Input'

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
        <Input
          name="content"
          value={formState.content}
          label="Prompt"
          placeholder="Prompt content"
          handleOnChange={handleFormChange}
          textearea
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
