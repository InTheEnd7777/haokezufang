import storage from './storage'
const TK = 'HKZF'
export const getToken = () => storage.get(TK)
export const setToken = (token) => {
  storage.set(TK, token)
}
export const removeItem = () => {
  storage.remove(TK)
}
