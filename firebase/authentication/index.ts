import React from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { app } from '../client'
import { Credentials, UserInfo } from 'interfaces'

const auth = getAuth(app)

const normalizeUserInfo = ({ email, displayName, uid, photoURL }: UserInfo) => ({
  email,
  displayName: !displayName && 'Ladrillos Mocoa',
  photoURL,
  uid
})

export const onAuthUser = (setUser: React.SetStateAction<UserInfo | any>) => {
  return onAuthStateChanged(auth, (credential: UserInfo | any) => {
    const normalizeUser = credential ? normalizeUserInfo(credential) : null
    setUser(normalizeUser)
  })
}

export const signIn = ({ email, password }: Credentials) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = () => signOut(auth) 
