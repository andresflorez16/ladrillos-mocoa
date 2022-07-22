import { ProductData } from './forms-props'

export interface Product {
	name: string,
	cantity?: number,
	id: string,
}

export interface NewProduct {
  name: string,
	cantity: number
}

export interface BrickProps {
	brickData: Product[]
}

export interface CementProps {
	cementData: Product[]
}

export interface Inventory {
	bricks: Product[],
	cements: Product[]
}

export interface DataBillForm {
	total: number,
	brick: ProductData[],
	cement: ProductData[],
	other: ProductData[],
	payType: string,
	pay: string,
	shipping: string,
	isEmail: string,
	isFlete: string,
	fleteValue: number,
	emailBill: string,
	billNumber: string
}

export interface PendingData {
	date: string;
	data: DataBillForm;
	collection: string
}

export interface NoData {
	msg: string,
	code: number
}

export interface UpdatePendingBillData {
	collection: string,
	id: string,
  shipping: string,
	payType: string,
	pay: string
}
