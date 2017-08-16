import emailRX from 'regex-email'

export default function isValidEmail(email) {
  return emailRX.test(email)
}
