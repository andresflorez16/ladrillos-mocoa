import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { Data } from 'interfaces'


const mailer = (req: NextApiRequest, res: NextApiResponse<Data>)  => {
  res.status(200).json({ email: 'hello' })
}

export default mailer
