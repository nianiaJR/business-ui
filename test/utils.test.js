import { AuthorizationUtils } from '../components'

describe('测试AuthorizationUtitls', () => {
  it('测试签名函数运行正确', () => {
    const now = Date.now()
    const request1 = {
      api: '/test?key1=2&key2=2&key3',
      method: AuthorizationUtils.HttpMethod.GET,
      sk: '1234566',
      ak: '1234562',
      headers: {
        'Host ': '123'
      }
    }

    const request2 = {
      api: '/test?key3&key1=2&key2=2',
      method: AuthorizationUtils.HttpMethod.GET,
      sk: '1234566',
      ak: '1234562',
      headers: {
        ' Host': '123'
      }
    }

    const sign1 = AuthorizationUtils.sign(request1.api, {
      sk: request1.sk,
      ak: request1.ak,
      headers: request1.headers,
      method: request1.method,
      timestamp: now
    })

    const sign2 = AuthorizationUtils.sign(request2.api, {
      sk: request2.sk,
      ak: request2.ak,
      headers: request2.headers,
      method: request2.method,
      timestamp: now
    })

    expect(sign1).toBe(sign2)
  })

  it('没有querystring时，测试签名函数运行正确', () => {
    const now = Date.now()
    const request1 = {
      api: '/test?',
      method: AuthorizationUtils.HttpMethod.GET,
      sk: '1234566',
      ak: '1234562',
      headers: {
        'Host ': '123'
      }
    }

    const request2 = {
      api: '/test?',
      method: AuthorizationUtils.HttpMethod.GET,
      sk: '1234566',
      ak: '1234562',
      headers: {
        ' Host': '123'
      }
    }

    const sign1 = AuthorizationUtils.sign(request1.api, {
      sk: request1.sk,
      ak: request1.ak,
      headers: request1.headers,
      method: request1.method,
      timestamp: now
    })

    const sign2 = AuthorizationUtils.sign(request2.api, {
      sk: request2.sk,
      ak: request2.ak,
      headers: request2.headers,
      method: request2.method,
      timestamp: now
    })

    expect(sign1).toBe(sign2)
  })

  it('因为header不一样，测试两次加密效果不一致', () => {
    const now = Date.now()
    const request1 = {
      api: '/test?',
      method: AuthorizationUtils.HttpMethod.GET,
      sk: '1234566',
      ak: '1234562',
      headers: {
        'Host ': '1234'
      }
    }

    const request2 = {
      api: '/test?',
      method: AuthorizationUtils.HttpMethod.GET,
      sk: '1234566',
      ak: '1234562',
      headers: {
        ' Host': '123'
      }
    }

    const sign1 = AuthorizationUtils.sign(request1.api, {
      sk: request1.sk,
      ak: request1.ak,
      headers: request1.headers,
      method: request1.method,
      timestamp: now
    })

    const sign2 = AuthorizationUtils.sign(request2.api, {
      sk: request2.sk,
      ak: request2.ak,
      headers: request2.headers,
      method: request2.method,
      timestamp: now
    })

    expect(sign1).not.toBe(sign2)
  })

  // it('联调测试', () => {
  //   const now = 1553668888
  //   const sign = AuthorizationUtils.sign('/openapi/v1/test?', {
  //     ak: 'HrymHl0PBJp51MirGOw55aDz',
  //     sk: 'HrymHl0PBJp51MirGOw55aDzzgKCOW8X',
  //     headers: {
  //       Host: '10.31.113.231:8080',
  //       'Content-Type': 'application/json'
  //     },
  //     method: AuthorizationUtils.HttpMethod.GET,
  //     timestamp: now
  //   })
  // })
})