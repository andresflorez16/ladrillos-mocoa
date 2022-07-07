export interface Product {
	name: string,
	id: string
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
