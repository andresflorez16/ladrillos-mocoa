import axios from 'axios'

const path = (typeof window === 'undefined') ? '' : window.location.origin

export const api = axios.create({ baseURL: path })
