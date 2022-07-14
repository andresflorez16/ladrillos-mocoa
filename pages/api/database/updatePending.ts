import { NextApiRequest, NextApiResponse } from 'next'
import db from './index'

const refSales = db.collection('ventas')

const updatePending = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bill = refSales.doc(req.body.collection).collection('mes').doc(req.body.id)
    const updated = await bill.update({ shipping: req.body.shipping, pay: req.body.pay, payType: req.body.payType })
    console.log(updated)
    res.json({})
  }
  catch (err) {
    console.log('Error updating pending bill', err)
    res.status(500).json({ msg: err, code: 500 })
  }
}

export default updatePending 
