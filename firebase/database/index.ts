import {  
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  onSnapshot,
  updateDoc,
  getDocs
} from 'firebase/firestore'
import { app } from '../client'
import { DataBillForm, PendingData, UpdatePendingBillData, NewProduct, Product } from 'interfaces'
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

export const addProduct = async (ref: string, data: NewProduct) => {
  return await addDoc(collection(db, ref), data)
}

export const listeningInventory = (callback: any, product: string) => {
  return onSnapshot(collection(db, product), (data) => {
    const bricks = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    callback(bricks)
  })
} 

export const getProductData = (callback: any, id: string, ref: string) => {
  try {
    return onSnapshot(doc(db, ref, id), (res) => callback({ ...res.data(), id: res.id }))
  } catch (err) {
    return null
  }
}

export const updateProduct = async (ref: string, id: string, data: Product) => {
  const docRef = doc(db, ref, id)
  return await updateDoc(docRef, { name: data.name, cantity: data.cantity })
}
