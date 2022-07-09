import { ProductData } from './forms-props'

export interface Product {
	name: string,
	id: string,
}

export interface BrickProps {
	brickData: Product[]
}

export interface CementProps {
	cementData: Product[]
}

export interface Inventory {
	bricks: BrickProps,
	cements: CementProps
}

export interface DataBillForm {
	total: number,
	brick: ProductData[],
	cement: ProductData[],
	payType: string,
	shipping: string,
	isEmail: string,
	emailBill: string
}
