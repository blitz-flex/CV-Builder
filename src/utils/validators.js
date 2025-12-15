export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const isValidURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isValidPhone = (phone) => {
  return /^[\d\s\-\+\(\)]+$/.test(phone)
}
