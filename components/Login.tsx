import React from 'react'
import { Form, Input, Button } from 'antd'
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form'
import intl from 'react-intl-universal'
import styled from 'styled-components'

import { enUS, zhCN } from './config/locales'
import {
  accountRules,
  emailRules,
  passwordRules,
  verifyCodeRules,
  idRules
} from './config/rules'
import LoginMode from './LoginMode'

interface IFormRule {
  username?: object
  password?: object
  verifyCode?: object
}

interface IProps {
  /**
   * 登录触发
   * (form) => void, form详细信息（https://ant.design/components/form-cn/#Form）
   */
  onLogin: (form: WrappedFormUtils) => void
  /**
   * 支持登录的账号类型
   * email(邮箱)/both(邮箱和手机号)/id(账号)
   */
  mode?: LoginMode
  /**
   * 国际化选择 zh-CN/en-US
   * @default zh-CN
   */
  currentLocale?: string
  /**
   * 忘记密码
   */
  onForgetPassword?: () => void
  /**
   * 修改密码
   */
  onModifyPassword?: () => void
  /**
   * 注册
   */
  onRegister?: () => void
  /**
   * antd的form表单套件
   */
  form: any
  /**
   * 登录的title
   */
  title?: string
  /**
   * 表单的规则
   */
  formRules?: IFormRule
  /**
   * 是否使用验证码输入
   * @default false
   */
  showVerifyCode?: boolean
  /**
   * 验证码按钮
   * @default <button>
   */
  verifyCodeButton?: any
  /**
   * 发送验证码
   */
  onVerifyCode?: () => void
}

const locales = {
  'en-US': enUS,
  'zh-CN': zhCN
}

const FormItem = Form.Item

const noop = () => {}

const StyledWrapperDiv = styled.div`
  padding: 30px;
  width: 380px;
  min-width: 300px;
  min-height: 447px;
  background: #fff;
  border: 1px solid #eee;
  overflow: hidden;

  @media (max-width: 400px) {
    padding: 5vw;
    width: 90vw;
    height: 417px;
  }
`

const StyledFormItem = styled(FormItem)`
  margin-bottom: 20px;
  .ant-input {
    padding: 14px;
    width: 100%;
    height: 44px;
    min-width: 265px;
    font-size: 14px;
    border-radius: 2px;
    border: 1px solid #e9eaeb;
  }

  &.verify-code-item {
    color: #red;

    .ant-input-group-addon {
      padding: 0;
      width: 100px;

      .code-button-wrapper {
        cursor: pointer;

        > * {
          height: 42px;
          border: none;
        }
      }
    }

    #verifyCode {
      min-width: auto;
    }
  }
` as any

const StyledCopyright = styled.p`
  margin-top: 78px;
  font-size: 12px;
  text-align: center;
  color: #abadb0;
  @media (max-width: 400px) {
    margin-top: 48px;
  }
`

class LoginComponent extends React.Component<IProps & FormComponentProps, {}> {
  render() {
    const { getFieldDecorator, setFieldsValue, getFieldValue } = this.props.form
    const {
      mode = LoginMode.both,
      onLogin = noop,
      onForgetPassword,
      onModifyPassword,
      onRegister,
      title,
      formRules = {},
      showVerifyCode = false,
      verifyCodeButton,
      onVerifyCode = noop
    } = this.props
    intl.init({
      locales: {},
      // 避免与已有的语言包冲突
      ...intl.getInitOptions(),
      currentLocale: this.props.currentLocale || 'zh-CN'
    })
    // 这里采用load的方式加载使得locales以合并的方式加载，以避免与外部的语言包冲突
    intl.load(
      locales
    )
    const rules = {
      email: emailRules(intl),
      both: accountRules(intl),
      id: idRules(intl)
    }
    const placeholder = {
      email: intl.get('business.authorization.placeholder.email'),
      both: intl.get('business.authorization.placeholder.account'),
      id: intl.get('business.authorization.placeholder.id'),
      phone: intl.get('business.authorization.placeholder.phone')
    }

    return (
      <StyledWrapperDiv className="business-login">
        <h3
          style={{
            fontSize: '24px',
            color: '#2c333a',
            marginTop: '10px',
            marginBottom: '36px',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {title || intl.get('business.authorization.login.title')}
        </h3>
        <Form>
          <StyledFormItem>
            {getFieldDecorator('username', {
              validateFirst: true,
              rules: formRules.username ? formRules.username : rules[mode]
            })(
              <Input
                size="large"
                placeholder={placeholder[mode]}
                onBlur={() => {
                  if (getFieldValue('username')) {
                    setFieldsValue({
                      username: getFieldValue('username').trim()
                    })
                  }
                }}
              />
            )}
          </StyledFormItem>
          <StyledFormItem>
            {getFieldDecorator('password', {
              validateFirst: true,
              rules: formRules.password
                ? formRules.password
                : passwordRules(intl)
            })(
              <Input
                type="password"
                placeholder={intl.get('business.authorization.placeholder.password')}
                size="large"
              />
            )}
          </StyledFormItem>
          {
            showVerifyCode && <StyledFormItem className="verify-code-item">
              {
                getFieldDecorator('verifyCode', {
                  validateFirst: true,
                  rules: formRules.verifyCode || verifyCodeRules(intl)
                })(
                  <Input
                    type="text"
                    placeholder={intl.get('business.authorization.placeholder.verifyCode')}
                    size="large"
                    addonAfter={<div onClick={onVerifyCode} className="code-button-wrapper">
                      {verifyCodeButton || <Button>{intl.get('business.authorization.login.sendVerifyCode')}</Button>}
                    </div>}
                  />
                )
              }
            </StyledFormItem>
          }
          <StyledFormItem>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                width: '100%',
                background: '#3e8eff',
                color: '#fff',
                height: 46,
                fontSize: 14,
                borderRadius: 2
              }}
              onClick={() => {
                onLogin(this.props.form)
              }}
            >
              {intl.get('business.authorization.login.action')}
            </Button>
          </StyledFormItem>
          <div
            style={{ marginTop: '18px', fontSize: '12px', textAlign: 'right' }}
          >
            {onForgetPassword && (
              <a
                onClick={e => {
                  e.preventDefault()
                  onForgetPassword()
                }}
                style={{ color: '#abadb0', marginRight: '16px' }}
              >
                {intl.get('business.authorization.login.forget')}
              </a>
            )}
            {
              onModifyPassword && (
                <a
                  onClick={e => {
                    e.preventDefault()
                    onModifyPassword()
                  }}
                  style={{ color: '#abadb0', marginRight: '16px' }}
                >
                  {intl.get('business.authorization.login.modifyPassword')}
                </a>
              )
            }
            {onRegister && (
              <a
                onClick={e => {
                  e.preventDefault()
                  onRegister()
                }}
              >
                {intl.get('business.authorization.login.register')}
              </a>
            )}
          </div>
        </Form>
        <StyledCopyright>{intl.get('business.authorization.copyright')}</StyledCopyright>
      </StyledWrapperDiv>
    )
  }
}

const Login = Form.create<IProps>()(LoginComponent)

export default Login;

