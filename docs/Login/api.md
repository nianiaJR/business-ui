### 接口描述 - Login

| 属性             | 说明                                            | 类型                                                                 | 必须 | 默认值           |
| ---------------- | ----------------------------------------------- | -------------------------------------------------------------------- | ---- | ---------------- |
| onLogin          | 登录触发                                        | (Function(form: [Form](https://ant.design/components/form-cn/#Form)) | Y    | 无               |
| mode             | 登录模式：`email or both` (`邮箱 or 手机邮箱`） | Enum                                                                 | N    | both             |
| currentLocale    | 国际化                                          | string                                                               | N    | zh-CN            |
| onForgetPassword | 忘记密码触发，如果不填此参数，将不会显示入口    | Function                                                             | N    | -                |
| onRegister       | 注册触发，如果不填此参数，将不会显示入口        | Function                                                             | N    | -                |
| title            | 登录框标题                                      | string                                                               | N    | '账户登录' |
| formRules        | 自定义表单规则覆盖                              | IFormRule                                                            | N    | 统一的默认规则   |
| showVerifyCode | 显示验证码输入框 | boolean | N    | false |
| verifyButton | 验证码发送按钮，当 showVerifyCode 为 true 时生效 | ReactNode | HTML | N    | button |
| onVerifyCode | 发送验证码事件触发 | () => void  | N    | - |
| onModifyPassWord | 修改密码触发 | () => void  | N    | - |


### IFormRule
| 属性     | 说明         | 类型                                                                                         | 必须 | 默认值 |
| -------- | ------------ | -------------------------------------------------------------------------------------------- | ---- | ------ |
| password | 密码校验规则 | [Array<object>](https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) | Y    | 无     |
| username | 账号校验规则 | [Array<object>](https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) | Y    | 无     |