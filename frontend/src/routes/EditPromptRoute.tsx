import { NavLink, useLoaderData } from 'react-router-dom'
import './AddPromptRoute.css'
import { useEffect, useState } from 'react'
import { useCreatePrompt } from '../data/useCreatePrompt'
import { getPrompt } from '../data/useGetPrompt'

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
  console.log(data)

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
      <h1>Edit prompt</h1>
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
