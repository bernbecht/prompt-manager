import { NavLink } from 'react-router-dom'
import './AddPromptRoute.css'

export function AddPromptRoute() {
  return (
    <div>
      <h1>Add a prompt</h1>
      <NavLink to="/">Back</NavLink>
      <form>
        <span>
          <label htmlFor="prompt">Title</label>
          <input type="text" placeholder="" name="title" />
        </span>
        <span>
          <label htmlFor="answer">Prompt</label>
          <textarea placeholder="" name="prompt" />
        </span>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
