import { NextApiRequest, NextApiResponse } from 'next'
import db from './index'
import { PendingData } from 'interfaces'

const refSales = db.collection('ventas')

const getPending = async (req: NextApiRequest, res: NextApiResponse<PendingData[] | any>) =>{
  try {
    const dataId = await refSales.get()
    const ids = dataId.docs.map(el => el.id)
    const data = ids.map(async elId => {
      const sales = await refSales.doc(elId).collection('mes').get()
      return sales.docs.map(el => ({ date: el.id, data: el.data() }))
    })
    const dataRaw = await Promise.all(data)
    const pending = dataRaw.reduce((acc, el) => acc.concat(el), [])

    if (pending.length > 0) {
      res.status(200).json(pending)
    } else res.status(200).json({ msg: 'Empty collection', code: 204 })

  }
  catch (err) {
    console.log('Error getting pending')
    res.status(500).json({ msg: err, code: 500 })
  }
}

export default getPending
