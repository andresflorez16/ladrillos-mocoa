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
	bricks: Product[],
	cements: Product[]
}

export interface DataBillForm {
	total: number,
	brick: ProductData[],
	cement: ProductData[],
	other?: ProductData[],
	payType: string,
	shipping: string,
	isEmail: string,
	emailBill: string,
	billNumber: string
}

export interface PendingData {
	date: string;
	data: DataBillForm;
}
