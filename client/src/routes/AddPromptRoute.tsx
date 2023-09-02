import { NavLink } from 'react-router-dom'
import './AddPromptRoute.css'
import { useState } from 'react'
import { useCreatePrompt } from '../data/useCreatePrompt'
import { PromptForm } from '../components'

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
      <PromptForm
        title={formState.title}
        content={formState.content}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export const URL = '/prompts/add'
