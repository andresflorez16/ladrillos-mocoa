import admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.ADMIN_PROJECT_ID,
      privateKey: process.env.ADMIN_KEY,
      clientEmail: process.env.ADMIN_EMAIL_CLIENT
    }),
  })
}

export default getFirestore()
