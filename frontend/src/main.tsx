import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from 'react-router-dom'
import { AddPromptRoute, RootRoute } from './routes'
import {
  EditPromptRoute,
  loader as promptLoader,
} from './routes/EditPromptRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
  },
  {
    path: '/prompts/add',
    element: <AddPromptRoute />,
  },
  {
    path: '/prompts/:id/edit',
    // if an exception is thrown here
    loader: promptLoader,
    // or here
    element: <EditPromptRoute />,
    // this will render instead of the element
    errorElement: <ErrorBoundary />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>
}
