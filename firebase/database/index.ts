import {  
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  query,
  where,
  getDoc,
  getDocs
} from 'firebase/firestore'
import { app } from '../client'
import { DataBillForm, PendingData, UpdatePendingBillData } from 'interfaces'
import { api } from 'api-queries'

const db = getFirestore(app)

export const getInventory = async () => {
  const brickData = await getDocs(collection(db, 'ladrillos'))
  const cementData = await getDocs(collection(db, 'cementos'))
  return { brickData, cementData }
}

const getDate = async () => {
  const currentDate = new Date(Date.now())
  const currentMonth = currentDate.getUTCMonth()
  const currentYear = currentDate.getUTCFullYear()
  const query = await getDocs(collection(db, 'ventas'))
  const results =  query.docs.map(doc => {
    let newDate: number | string = ''
    const queryDate = new Date(parseInt( doc.id ))
    const queryMonth = queryDate.getUTCMonth()
    const queryYear = queryDate.getUTCFullYear()
    if (currentMonth === queryMonth) {
      if (currentYear === queryYear) newDate = doc.id
      else newDate = Date.now()
    } else newDate = Date.now()
    return newDate
  })
  return results
}

export const addBill = async (data: DataBillForm) => {
  const [ date ] = await getDate()
  const ref = doc(db, 'ventas', date.toString(), 'mes', Date.now().toString())
  return await setDoc(ref, data)
}

export const formatPendingData = (data: PendingData[], billNumber: string) => {
  const pendingData = data.filter(el => {
    if (el.data.pay.length > 0 && el.data.payType === 'credit') {
      const pay = parseFloat(el.data.pay)
      return (el.data.shipping === 'pending' || pay < el.data.total )
    } else return (el.data.payType === 'credit' || el.data.shipping === 'pending')
  })
  if (pendingData.length > 0) {
    const filterBillNumber = pendingData.filter(el => el.data.billNumber === billNumber)
    if (filterBillNumber.length > 0) return filterBillNumber
    else return pendingData
  } else return []
}

export const updatingPendingBill = async (dataBill: UpdatePendingBillData) => {
  const { data } = await api.put('/api/database/updatePending', dataBill)
} 
