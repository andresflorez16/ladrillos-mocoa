import { ChangeEventHandler, FormEventHandler } from 'react'

export interface FormProps {
  handleSubmit: FormEventHandler,
  handleChange: ChangeEventHandler
}

export interface ProductData {
  id: string,
  cantity: number,
  price: number,
  subtotal: number,
  name: string
}

export interface DataForm {
  total: number,
  brick: ProductData[],
  cement: ProductData[],
  other: ProductData[]
}
