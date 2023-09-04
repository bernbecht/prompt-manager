import { Prompt as PromptModel } from 'prompt-mgmt'

export type NewPrompt = Omit<PromptModel, 'id'>
