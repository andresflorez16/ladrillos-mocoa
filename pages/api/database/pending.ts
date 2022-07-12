import { NextApiRequest, NextApiResponse } from 'next'
import db from './index'

const refSales = db.collection('ventas')

const getPending = async (req: NextApiRequest, res: NextApiResponse<any>) =>{
  try {
    const sales = await db.collection('ventas').get()

  }
  catch (err) {
    console.log('Error getting pending')
    res.status(500).json({ msg: err })
  }
}

export default getPending
