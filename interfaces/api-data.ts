import type { NextApiRequest, NextApiResponse } from 'next'

export interface Data {
	email: string
}

export interface ApiProps {
	req: NextApiRequest,
	res: NextApiResponse<Data>
}
