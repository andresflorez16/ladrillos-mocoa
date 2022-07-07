import {  
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { app } from '../client'

const db = getFirestore(app)

export const getInventory = async () => {
  const brickData = await getDocs(collection(db, 'ladrillos'))
  const cementData = await getDocs(collection(db, 'cementos'))
  return { brickData, cementData }
}
