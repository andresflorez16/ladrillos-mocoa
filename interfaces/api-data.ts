import type { NextApiRequest, NextApiResponse } from 'next'

export interface Data {
	msg: string
}

export interface ApiProps {
	req: NextApiRequest,
	res: NextApiResponse<Data>
}
