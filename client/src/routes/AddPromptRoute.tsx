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
      <h1>Add a prompt</h1>
      <NavLink to="/">Back</NavLink>
      <form>
        <span>
          <label htmlFor="prompt">Title</label>
          <input
            type="text"
            placeholder=""
            name="title"
            value={formState.title}
            onChange={handleFormChange}
          />
        </span>
        <span>
          <label htmlFor="answer">Prompt</label>
          <textarea
            placeholder=""
            name="content"
            value={formState.content}
            onChange={handleFormChange}
          />
        </span>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export const URL = '/prompts/add'
