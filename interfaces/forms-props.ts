import { ChangeEventHandler, FormEventHandler } from 'react'

export interface FormProps {
  handleSubmit: FormEventHandler,
  handleChange: ChangeEventHandler
}

export interface ProductData {
  name: string,
  cantity: string,
  price: string,
  subtotal: number
}
