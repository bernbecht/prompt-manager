import { NavLink, useLoaderData } from 'react-router-dom'
import './AddPromptRoute.css'
import { useEffect, useState } from 'react'
import { useCreatePrompt } from '../data/useCreatePrompt'
import { getPrompt } from '../data/useGetPrompt'
import { PromptForm } from '../components'
import { NewPrompt } from '../types'

export function EditPromptRoute() {
  const [formState, setFormState] = useState<NewPrompt>({
    title: '',
    content: '',
    authorId: 1, // TODO: use real author id
  })
  const { create } = useCreatePrompt()

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    console.log(formState)
    console.log('submit')
    create({ ...formState })
  }

  function handleFormChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>

  useEffect(() => {
    if (data) {
      setFormState({
        title: data.title,
        content: data.content,
        authorId: data.authorId,
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
        title={formState.title || ''}
        content={formState.content || ''}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export async function loader({ params }: { params: any }) {
  const { id } = params
  return await getPrompt(id)
}

export const URL = '/prompts/:id/edit'
