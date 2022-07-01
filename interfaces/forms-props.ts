import { ChangeEventHandler, FormEventHandler } from 'react'

export interface FormProps {
  handleSubmit: FormEventHandler,
  handleChange: ChangeEventHandler
}
