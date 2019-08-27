import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { Login, LoginMode } from '../components'
import { zhCN } from '../components/authentication/config/locales'

describe('login', () => {
  test('login render', () => {
    const component = renderer.create(
      <Login onLogin={() => console.log('xxx')} />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree.props.className).toContain('business-login')
  })

  test('email mode', () => {
    const onLogin = jest.fn(() => {})
    const component = mount(
      <Login
        onLogin={onLogin}
        mode={Login.email}
        currentLocale="zh-CN"
        title="title test"
      />
    )
    component.find('button').simulate('click')
    expect(onLogin).toHaveBeenCalled()

    // 参数没有传入时，不应该有显示注册和忘记密码的入口
    expect(component.find('a').isEmpty()).toBe(true)

    expect(component.find('p').text()).toContain('')

    expect(component.find('h3').text()).toContain('test')
  })

  test('both mode', () => {
    const onLogin = jest.fn(() => {})
    const onRegister = jest.fn(() => {})
    const onForgetPassword = jest.fn(() => {})
    const component = mount(
      <Login
        onLogin={onLogin}
        onRegister={onRegister}
        onForgetPassword={onForgetPassword}
        mode={Login.both}
        currentLocale="en-US"
      />
    )

    component
      .find('a')
      .first()
      .simulate('click')
    component
      .find('a')
      .last()
      .simulate('click')

    expect(onRegister).toHaveBeenCalled()
    expect(onForgetPassword).toHaveBeenCalled()

    expect(component.find('p').text()).toContain('Business UI')
  })

  describe('表单规则测试', () => {
    test('账号、用户名为空', done => {
      const onLogin = ({ validateFields }) => {
        validateFields(errors => {
          expect(errors.username.errors[0].message).toBe(
            zhCN.placeholder.account
          )
          expect(errors.password.errors[0].message).toBe(
            zhCN.placeholder.password
          )
          done()
        })
      }
      const component = mount(<Login onLogin={onLogin} />)
      // 触发登录按钮
      component.find('button').simulate('click')
    })

    test('账号不符合规则', done => {
      const onLogin = ({ validateFields }) => {
        validateFields(errors => {
          expect(errors.username.errors[0].message).toBe(zhCN.alert.account)
          done()
        })
      }
      const component = mount(<Login onLogin={onLogin} />)
      component
        .find('#username')
        .hostNodes()
        .simulate('change', { target: { value: 'liangjiarui@business' } })
      component
        .find('#password')
        .hostNodes()
        .simulate('change', { target: { value: '12345678' } })
      component.find('button').simulate('click')
    })

    test('邮箱模式下，邮箱账号不符合规则', done => {
      const onLogin = ({ validateFields }) => {
        validateFields(errors => {
          expect(errors.username.errors[0].message).toBe(zhCN.alert.email)
          done()
        })
      }
      const component = mount(
        <Login onLogin={onLogin} mode={LoginMode.email} />
      )
      component
        .find('#username')
        .hostNodes()
        .simulate('change', { target: { value: 'liangjiarui@business' } })
      component
        .find('#password')
        .hostNodes()
        .simulate('change', { target: { value: '12345678' } })
      component.find('button').simulate('click')
    })

    test('手机账号不符合规则', done => {
      const onLogin = ({ validateFields }) => {
        validateFields(errors => {
          expect(errors.username.errors[0].message).toBe(zhCN.alert.account)
          done()
        })
      }
      const component = mount(<Login onLogin={onLogin} />)
      component
        .find('#username')
        .hostNodes()
        .simulate('change', { target: { value: '1234567890' } })
      component
        .find('#password')
        .hostNodes()
        .simulate('change', { target: { value: '12345678' } })
      component.find('button').simulate('click')
    })

    test('id账号不符合规则', done => {
      const onLogin = ({ validateFields }) => {
        validateFields(errors => {
          expect(errors.username.errors[0].message).toBe(zhCN.alert.id)
          done()
        })
      }
      const component = mount(<Login onLogin={onLogin} mode={LoginMode.id} />)
      component
        .find('#username')
        .hostNodes()
        .simulate('change', { target: { value: '12$34567890' } })
      component
        .find('#password')
        .hostNodes()
        .simulate('change', { target: { value: '12345678' } })
      component.find('button').simulate('click')
    })

    test('账号前后带空格', done => {
      const onLogin = ({ validateFields }) => {
        validateFields((errors, values) => {
          expect(errors).toBe(null)
          expect(values.username.trim()).toBe('jiarui@taobao.org')
          expect(values.password).toBe('12345678')
          done()
        })
      }
      const component = mount(<Login onLogin={onLogin} />)
      component
        .find('#username')
        .hostNodes()
        .simulate('change', { target: { value: ' jiarui@taobao.org ' } })
      component
        .find('#password')
        .hostNodes()
        .simulate('change', { target: { value: '12345678' } })
      component.find('button').simulate('click')
    })

    test('密码长度不够', done => {
      const onLogin = ({ validateFields }) => {
        validateFields(errors => {
          expect(errors.password.errors[0].message).toBe(zhCN.alert.password)
          done()
        })
      }
      const component = mount(<Login onLogin={onLogin} />)
      component
        .find('#username')
        .hostNodes()
        .simulate('change', { target: { value: '12345678901' } })
      component
        .find('#password')
        .hostNodes()
        .simulate('change', { target: { value: '1234567' } })
      component.find('button').simulate('click')
    })
  })

  test('账号输入框blur自动清除前后空格', done => {
    const onLogin = ({ getFieldValue }) => {
      expect(getFieldValue('username')).toBe('12345678901')
      done()
    }
    const component = mount(<Login onLogin={onLogin} />)
    const $username = component.find('#username').hostNodes()
    $username.simulate('focus')
    $username.simulate('change', { target: { value: ' 12345678901 ' } })
    $username.simulate('blur')
    component.find('button').simulate('click')
  })
})
