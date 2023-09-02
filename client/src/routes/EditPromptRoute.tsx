import { NavLink, useLoaderData } from 'react-router-dom'
import './AddPromptRoute.css'
import { useEffect, useState } from 'react'
import { useCreatePrompt } from '../data/useCreatePrompt'
import { getPrompt } from '../data/useGetPrompt'
import { PromptForm } from '../components'

export function EditPromptRoute() {
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

  const { data } = useLoaderData()

  useEffect(() => {
    if (data) {
      setFormState({
        title: data.title,
        content: data.content,
      })
    }
  }, [])

  return (
    <div>
      <nav className="mb-8">
        <NavLink className="text-left font-light" to="/">
          Back
        </NavLink>
        <h1 className="text-xl font-semibold">Edit the prompt</h1>
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

export async function loader({ params }) {
  const { id } = params
  try {
    const data = await getPrompt(id)
    return { data }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export const URL = '/prompts/:id/edit'
