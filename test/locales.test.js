import {
  enUS
} from '../lib/authentication/config/locales/en-US'
import {
  zhCN
} from '../lib/authentication/config/locales/zh-CN'

const keyTest = (obj1, obj2) => {
  const keys1 = Object.keys(obj1).sort()
  const keys2 = Object.keys(obj2).sort()
  if (keys1.toString() !== keys2.toString()) {
    return false
  } else {
    for (let i in keys1) {
      if (typeof (obj1[keys1[i]]) === 'object') {
        if (!keyTest(obj1[keys1[i]], obj2[keys1[i]])) {
          return false
        }
      }
    }
  }
  return true
}

describe('locales test', () => {
  test('key equally', () => {
    expect(keyTest(enUS, zhCN)).toBe(true)
  })
})