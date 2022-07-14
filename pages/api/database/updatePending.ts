import { NextApiRequest, NextApiResponse } from 'next'
import db from './index'

const refSales = db.collection('ventas')

const updatePending = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body)
    res.json({})
  }
  catch (err) {
    console.log('Error updating pending bill', err)
    res.status(500).json({ msg: err, code: 500 })
  }
}

export default updatePending 
