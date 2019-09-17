import React from 'react'

import { storiesOf } from '@storybook/react'
import { Login, LoginMode } from '../components'

import Collapse from '../story-utils/Collapse'
import apiMD from '../docs/Login/api.md'
import demo1MD from '../docs/Login/demo1.md'
import demo2MD from '../docs/Login/demo2.md'
import demo3MD from '../docs/Login/demo3.md'
import demo4MD from '../docs/Login/demo4.md'
import demo5MD from '../docs/Login/demo5.md'
import demo6MD from '../docs/Login/demo6.md'

storiesOf('Login-登录', module)
  .addParameters({
    info: {
      source: false,
      propTables: null
    }
  })
  .add('邮箱登录', () => (
    <>
      <Login mode={LoginMode.email} onLogin={() => alert('触发登录')} />
      <Collapse apiMarkdown={apiMD} codeMarkdown={demo1MD} />
    </>
  ))
  .add('邮箱登录-显示相关跳转接口', () => (
    <>
      <Login
        mode={LoginMode.email}
        onLogin={() => alert('触发登录')}
        onRegister={() => alert('注册')}
        onForgetPassword={() => alert('忘记密码')}
      />
      <Login
        mode={LoginMode.email}
        onLogin={() => alert('触发登录')}
        onRegister={() => alert('注册')}
        onModifyPassword={() => alert('修改密码')}
      />
      <Collapse apiMarkdown={apiMD} codeMarkdown={demo2MD} />
    </>
  ))
  .add('id账号', () => (
    <>
      <Login mode={LoginMode.id} onLogin={() => alert('触发登录')} />
      <Collapse apiMarkdown={apiMD} codeMarkdown={demo3MD} />
    </>
  ))
  .add('支持双账号登录', () => (
    <>
      <Login mode={LoginMode.both} onLogin={() => alert('触发登录')} />
      <Collapse apiMarkdown={apiMD} codeMarkdown={demo4MD} />
    </>
  ))
  .add('自定表单校验规则', () => (
    <>
      <Login
        formRules={{
          username: [
            {
              max: 14,
              message: '账号长度不能超过14'
            }
          ],
          password: [
            {
              max: 10,
              message: '密码长度不能超过10'
            }
          ]
        }}
        onLogin={() => alert('触发登录')}
      />
      <Collapse apiMarkdown={apiMD} codeMarkdown={demo5MD} />
    </>
  ))
  .add('可配置验证码输入', () => (
    <>
      <Login
        mode={LoginMode.both}
        onLogin={() => alert('触发登录')}
        showVerifyCode
        onVerifyCode={() => alert('触发发送验证码')}
      />
      <Login
        mode={LoginMode.both}
        onLogin={() => alert('触发登录')}
        showVerifyCode
        onVerifyCode={() => alert('触发发送验证码')}
        verifyCodeButton={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9h7gMzv27Z0HXR7VnwF_o0tv0mQWFZcgTRvhpB3PoPSnSthF-" width="100%" height="100%" />}
      />
      <Collapse apiMarkdown={apiMD} codeMarkdown={demo6MD} />
    </>
  ))