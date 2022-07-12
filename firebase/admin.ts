import admin from 'firebase-admin'

if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.ADMIN_PROJECT_ID,
      privateKey: process.env.ADMIN_KEY,
      clientEmail: process.env.ADMIN_EMAIL_CLIENT
    }),
    databaseURL: process.env.DATABASE_URL
  })
}

export default admin.firestore()
