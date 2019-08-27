import React from 'react'
import { Register } from '../components'
import { shallow, mount } from 'enzyme'
import { zhCN } from '../components/authentication/config/locales'

describe('register', () => {
  test('register render', () => {
    const component = shallow(
      <Register
        onChooseMail={() => console.log('1')}
        onChoosePhone={() => console.log('1')}
        onRegister={() => console.log('1')}
      />
    )
    expect(component).toMatchSnapshot()
  })

  test('邮箱注册', done => {
    const onChooseMail = jest.fn(() => {})
    const onChoosePhone = jest.fn(() => {})
    const onRegister = ({ validateFields }) => {
      validateFields((err, values) => {
        expect(err).toBeNull()
        expect(values.username).toBe('liangjiarui@business.com')
        expect(values.password).toBe('12345678')

        done()
      })
    }
    const onExisting = jest.fn(() => {})
    const component = mount(
      <Register
        onChooseMail={onChooseMail}
        onChoosePhone={onChoosePhone}
        onRegister={onRegister}
        onExisting={onExisting}
        currentLocale="zh-CN"
      />
    )
    component
      .find('.ant-menu-item')
      .first()
      .simulate('click')
    expect(onChooseMail).toHaveBeenCalled()
    // 输入邮箱账号
    const $email = component.find('#username').hostNodes()
    $email.simulate('focus')
    $email.simulate('change', { target: { value: ' liangjiarui@business.com ' } })
    $email.simulate('blur')

    // 输入密码
    const $password = component.find('#password').hostNodes()
    $password.simulate('focus')
    $password.simulate('change', { target: { value: '12345678' } })

    // 确认密码
    const $repeatPassword = component.find('#repeat-password').hostNodes()
    $repeatPassword.simulate('focus')
    $repeatPassword.simulate('change', { target: { value: '12345678' } })

    component
      .find('a')
      .last()
      .simulate('click')
    expect(onExisting).toHaveBeenCalled()

    component.find('[type="submit"]').simulate('click')

    component.unmount()
  })

  test('phone register', done => {
    const onChooseMail = jest.fn(() => {})
    const onChoosePhone = jest.fn(() => {})
    const onRegister = ({ validateFields }) => {
      validateFields((err, values) => {
        expect(err).toBeNull()
        expect(values.username).toBe('12345678901')
        expect(values.password).toBe('12345678')
        expect(values.verifycode).toBe('1234')

        done()
      })
    }
    const sendVerify = jest.fn(() => {})
    const component = mount(
      <Register
        type="phone"
        onChooseMail={onChooseMail}
        onChoosePhone={onChoosePhone}
        onRegister={onRegister}
        sendVerify={sendVerify}
        currentLocale="zh-CN"
      />
    )
    component
      .find('.ant-menu-item')
      .last()
      .simulate('click')
    expect(onChoosePhone).toHaveBeenCalled()

    // 输入手机账号
    const $email = component.find('#username').hostNodes()
    $email.simulate('focus')
    $email.simulate('change', { target: { value: ' 12345678901 ' } })
    $email.simulate('blur')

    // 输入密码
    const $password = component.find('#password').hostNodes()
    $password.simulate('focus')
    $password.simulate('change', { target: { value: '12345678' } })

    // 确认密码
    const $repeatPassword = component.find('#repeat-password').hostNodes()
    $repeatPassword.simulate('focus')
    $repeatPassword.simulate('change', { target: { value: '12345678' } })

    // 验证码
    const $verifycode = component.find('#verifycode').hostNodes()
    $verifycode.simulate('focus')
    $verifycode.simulate('change', { target: { value: ' 1234 ' } })
    $verifycode.simulate('blur')
    // 发送验证码
    component
      .find('.btn-verifycode')
      .hostNodes()
      .simulate('click')

    // 已有账号入口不存在
    expect(component.find('a').length === 0)

    // 触发注册
    component.find('[type="submit"]').simulate('click')

    component.unmount()
  })

  test('确认密码', done => {
    const onChooseMail = jest.fn(() => {})
    const onChoosePhone = jest.fn(() => {})
    const onRegister = ({ validateFields }) => {
      validateFields((err, values) => {
        expect(err['repeat-password'].errors[0].message).toBe(
          zhCN.register.differInput
        )
        done()
      })
    }
    const sendVerify = jest.fn(() => {})
    const component = mount(
      <Register
        type="phone"
        onChooseMail={onChooseMail}
        onChoosePhone={onChoosePhone}
        onRegister={onRegister}
        sendVerify={sendVerify}
        currentLocale="zh-CN"
      />
    )
    component
      .find('.ant-menu-item')
      .last()
      .simulate('click')
    expect(onChoosePhone).toHaveBeenCalled()

    // 输入密码
    const $password = component.find('#password').hostNodes()
    $password.simulate('focus')
    $password.simulate('change', { target: { value: '12345678' } })

    // 确认密码
    const $repeatPassword = component.find('#repeat-password').hostNodes()
    $repeatPassword.simulate('focus')
    $repeatPassword.simulate('change', { target: { value: '12345677' } })
    $repeatPassword.simulate('blur')

    // 触发注册
    component.find('[type="submit"]').simulate('click')

    component.unmount()
  })
})
