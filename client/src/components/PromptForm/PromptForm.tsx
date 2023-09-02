import { Input } from '../Input'

export function PromptForm({
  title,
  content,
  handleFormChange,
  handleSubmit,
}: {
  title: string
  content: string
  handleFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void
}) {
  return (
    <form>
      <Input
        placeholder="Prompt title"
        name="title"
        value={title}
        label="Title"
        handleOnChange={handleFormChange}
      />
      <Input
        name="content"
        value={content}
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
          hover:bg-indigo-600 
          focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-70 
          outline-none
          transition
          "
        onClick={handleSubmit}
      >
        Save
      </button>
    </form>
  )
}
