import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { Data } from 'interfaces'
import 'dotenv/config'

const sendMail = async (req: NextApiRequest, res: NextApiResponse<Data>)  => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mocoaladrillos@gmail.com',
      pass: process.env.PASSWORD_APP
    }
  })
  transporter.sendMail({
    from: 'Ladrillos Mocoa MP - mocoaladrillos@gmail.com',
    to: req.body.email,
    subject: 'Factura electrónica - Ladrillos Mocoa MP',
    html: "<p>Gracias por la compra</p>"
  }, (err, info) => {
    err ? console.log(err) : console.log(info)
  })
  res.status(200).json({ msg: req.body.email })
}

export default sendMail
