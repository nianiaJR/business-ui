import * as React from 'react'
import { Form, Input, Menu, Select, Button } from 'antd'
import 'antd/lib/select/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/menu/style/css'
import 'antd/lib/form/style/css'
import styled from 'styled-components'
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form'
import intl from 'react-intl-universal'

import {
  phoneRules,
  emailRules,
  passwordRules,
  verifyCodeRules
} from './config/rules'
import { enUS, zhCN } from './config/locales'

enum Type {
  email = 'email',
  phone = 'phone'
}

interface IProps {
  /**
   * 选择邮箱注册事件触发
   */
  onChooseMail: () => void
  /**
   * 选择手机注册事件触发
   */
  onChoosePhone: () => void
  /**
   * 注册事件触发 (form) => void, form详细信息（https://ant.design/components/form-cn/#Form）
   */
  onRegister: (form: WrappedFormUtils) => void
  /**
   * 账号存在事件触发
   */
  onExisting?: () => void
  /**
   * 发送验证码事件触发
   */
  sendVerify?: (phone: string) => void
  /**
   * 国际化选择
   * @default zh-CN
   */
  currentLocale?: string
  /**
   * 注册类型 email|phone
   * @default email
   */
  type?: string
  form: any
}

interface IState {
  waitingSeconds: number
}

const locales = {
  'en-US': enUS,
  'zh-CN': zhCN
}

const FormItem = Form.Item
const { Option } = Select
const StyledFormItem = styled(FormItem)`
  margin-bottom: 20px;
  max-width: 370px;
  .ant-input {
    padding: 14px;
    height: 46px;
    font-size: 14px;
    border: 1px solid #e9eaeb;
    border-radius: 2px;
  }
` as any

const StyledBackground = styled.div`
  margin: 30px auto;
  width: 1100px;
  height: 700px;
  min-height: 550px;
  background: #fff;
  overflow: hidden;
  @media (max-width: 1100px) {
    width: 100vw;
    height: 100vh;
  }
`

const StyledWrapperDiv = styled.div`
  margin: 60px auto 0;
  width: 370px;
  min-width: 300px;
  @media (max-width: 400px) {
    width: 90vw;
  }
`

class RegisterComponent extends React.Component<
  IProps & FormComponentProps,
  IState
> {
  waitingTimer = 0
  constructor(props: IProps) {
    super(props)
    this.state = {
      waitingSeconds: 0
    }
  }

  componentWillUnmount() {
    if (this.waitingTimer) {
      window.clearInterval(this.waitingTimer)
    }
  }

  handleConfirmPassword = (rule?: any, value?: any, callback?: any) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('password')) {
      callback(intl.get('business.authorization.register.differInput'))
    }
    callback()
  }

  handleSendVerification = (sendVerify: any) => {
    this.props.form.validateFields(['username'], (err?: any) => {
      if (err) {
        return
      }
      this.setState(
        {
          waitingSeconds: 60
        },
        () => {
          sendVerify(this.props.form.getFieldValue('username'))
          this.waitingTimer = window.setInterval(() => {
            const { waitingSeconds } = this.state
            if (waitingSeconds === 0) {
              window.clearInterval(this.waitingTimer)
              return
            }
            this.setState({
              waitingSeconds: waitingSeconds - 1
            })
          }, 1000)
        }
      )
    })
  }

  trimSpace = (key: string) => {
    const { getFieldValue, setFieldsValue } = this.props.form

    setFieldsValue({
      [key]: (getFieldValue(key) || '').trim()
    })
  }

  render() {
    const { getFieldDecorator, resetFields } = this.props.form
    const {
      type,
      sendVerify,
      onChooseMail,
      onChoosePhone,
      onRegister,
      onExisting
    } = this.props
    const { waitingSeconds } = this.state
    const selectedType = type ? type : Type.email
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

    const phonePrefixSelector = getFieldDecorator('prefix', {
      validateFirst: true,
      initialValue: '86'
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    )

    const btnStyle = {
      width: 320,
      fontSize: '14px',
      color: '#fff',
      background: '#3e8eff',
      borderRadius: '2px'
    }

    const verifyBtnStyle = {
      display: 'inline-block',
      marginLeft: '6%',
      width: '30%',
      height: '46px',
      fontSize: '14px',
      color: '#575c61',
      background: '#f4f5f6',
      border: '1px solid #e9eaeb',
      borderRadius: '2px'
    }

    return (
      <StyledBackground className="business-register">
        <StyledWrapperDiv>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedType]}
            onSelect={() => {
              resetFields()
            }}
            style={{
              margin: '60px 0',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#2c333a',
              borderBottom: 0
            }}
          >
            <Menu.Item
              key="email"
              style={{ width: '80px', padding: 0, marginRight: '40px' }}
              onClick={() => {
                onChooseMail()
              }}
            >
              {intl.get('business.authorization.register.byEmail')}
            </Menu.Item>
            <Menu.Item
              key="phone"
              style={{ width: '80px', padding: 0 }}
              onClick={() => {
                onChoosePhone()
              }}
            >
              {intl.get('business.authorization.register.byPhone')}
            </Menu.Item>
          </Menu>
          <Form>
            {selectedType === Type.email ? (
              <StyledFormItem>
                {getFieldDecorator('username', {
                  validateFirst: true,
                  rules: emailRules(intl)
                })(
                  <Input
                    placeholder={intl.get('business.authorization.placeholder.email')}
                    size="large"
                    onBlur={() => this.trimSpace('username')}
                    style={{ width: '100%' }}
                  />
                )}
              </StyledFormItem>
            ) : (
              <StyledFormItem>
                {getFieldDecorator('username', {
                  validateFirst: true,
                  rules: phoneRules(intl)
                })(
                  <Input
                    addonBefore={phonePrefixSelector}
                    placeholder={intl.get('business.authorization.placeholder.phone')}
                    onBlur={() => this.trimSpace('username')}
                    size="large"
                  />
                )}
              </StyledFormItem>
            )}
            <StyledFormItem>
              {getFieldDecorator('password', {
                validateFirst: true,
                rules: passwordRules(intl)
              })(
                <Input
                  type="password"
                  placeholder={intl.get('business.authorization.register.passwordRequirement')}
                  size="large"
                  style={{ width: '100%' }}
                />
              )}
            </StyledFormItem>
            <StyledFormItem>
              {getFieldDecorator('repeat-password', {
                validateFirst: true,
                rules: [
                  {
                    required: true,
                    message: intl.get('business.authorization.register.passwordRequirement')
                  },
                  {
                    validator: this.handleConfirmPassword
                  }
                ]
              })(
                <Input
                  type="password"
                  placeholder={intl.get('business.authorization.register.confirmPassword')}
                  size="large"
                  style={{ width: '100%' }}
                />
              )}
            </StyledFormItem>
            {selectedType === Type.phone && (
              <StyledFormItem>
                <Input.Group>
                  {getFieldDecorator('verifycode', {
                    validateFirst: true,
                    rules: verifyCodeRules(intl)
                  })(
                    <Input
                      size="large"
                      style={{ width: '64%' }}
                      placeholder={intl.get('business.authorization.register.verifyCodePlaceholder')}
                      onBlur={() => this.trimSpace('verifycode')}
                    />
                  )}
                  {waitingSeconds ? (
                    <Button
                      className="btn-verifycode"
                      style={verifyBtnStyle}
                      disabled={true}
                    >
                      {intl.get('business.authorization.register.waiting', {
                        seconds: waitingSeconds
                      })}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        if (sendVerify) {
                          this.handleSendVerification(sendVerify)
                        }
                      }}
                      className="btn-verifycode"
                      style={verifyBtnStyle}
                    >
                      {intl.get('business.authorization.register.sendVerifyCode')}
                    </Button>
                  )}
                </Input.Group>
              </StyledFormItem>
            )}
            <FormItem style={{ marginTop: '30px' }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={() => {
                  onRegister(this.props.form)
                }}
                style={{ ...btnStyle, width: '100%' }}
              >
                {intl.get('business.authorization.register.title')}
              </Button>
            </FormItem>
            {onExisting && (
              <a
                style={{ float: 'right', color: '#ccc' }}
                onClick={e => {
                  e.preventDefault()
                  onExisting()
                }}
              >
                {intl.get('business.authorization.register.existing')}
              </a>
            )}
          </Form>
        </StyledWrapperDiv>
      </StyledBackground>
    )
  }
}

const Register = Form.create<IProps>()(RegisterComponent)

export default Register;
