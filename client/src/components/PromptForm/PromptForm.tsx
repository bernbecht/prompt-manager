import { Button } from '..'
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
      <Button text="Submit" handleClick={handleSubmit} />
    </form>
  )
}
