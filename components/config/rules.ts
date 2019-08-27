type IIntl = {
  get: Function
}

const accountRules = (intl: IIntl) => [
  {
    required: true,
    message: intl.get('business.authorization.placeholder.account')
  },
  {
    validator: (_: any, value: string, callback: Function) => {
      const emailTest = /^(\w+)(-\w+)*(\.\w+)*@(\w+)(\.\w+)*\.(\w+)$/i
      const phoneTest = /(\d){11}/g
      const input = value.trim()
      if (!emailTest.test(input) && !phoneTest.test(input)) {
        callback(intl.get('business.authorization.alert.account'))
      }
      callback()
    }
  }
]

const emailRules = (intl: IIntl) => [
  {
    required: true,
    message: intl.get('business.authorization.placeholder.email')
  },
  {
    validator: (_: any, value: string, callback: Function) => {
      const emailTest = /^(\w+)(-\w+)*(\.\w+)*@(\w+)(-\w+)*(\.\w+)*\.(\w+)$/i
      if (!emailTest.test(value.trim())) {
        callback(intl.get('business.authorization.alert.email'))
      }
      callback()
    }
  },
  { max: 65, message: intl.get('business.authorization.alert.long') }
]

const idRules = (intl: IIntl) => [
  {
    required: true,
    message: intl.get('business.authorization.placeholder.id')
  },
  {
    validator: (_: any, value: string, callback: Function) => {
      const idTest = /^\w+$/i
      if (!idTest.test(value.trim())) {
        callback(intl.get('business.authorization.alert.id'))
      }
      callback()
    }
  },
  { max: 65, message: intl.get('business.authorization.alert.long') }
]

const passwordRules = (intl: IIntl) => [
  { required: true, message: intl.get('business.authorization.placeholder.password') },
  { min: 8, message: intl.get('business.authorization.alert.password') }
]

const phoneRules = (intl: IIntl) => [
  { required: true, message: intl.get('business.authorization.placeholder.phone') },
  { pattern: /(\d){11}/g, message: intl.get('business.authorization.alert.phone') }
]

const verifyCodeRules = (intl: IIntl) => [
  { required: true, message: intl.get('business.authorization.register.verifyCodePlaceholder') }
]

export { accountRules, emailRules, passwordRules, phoneRules, verifyCodeRules, idRules }
