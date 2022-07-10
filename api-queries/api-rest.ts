import axios from 'axios'

const path = (typeof window === 'undefined') ? '' : window.location.origin

export const api_rest = axios.create({ baseURL: path })
