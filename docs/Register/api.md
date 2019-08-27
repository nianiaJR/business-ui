## 接口描述 - Register

| 属性          | 说明                                   | 类型                                                                 | 必须 | 默认值 |
| ------------- | -------------------------------------- | -------------------------------------------------------------------- | ---- | ------ |
| onChooseMail  | 点击邮箱注册触发                       | Function                                                             | Y    | -      |
| onChoosePhone | 点击手机注册触发                       | Function                                                             | Y    | -      |
| onRegister    | 点击注册触发                           | (Function(form: [Form](https://ant.design/components/form-cn/#Form)) | Y    | -      |
| type          | 注册种类：email or phone (`邮箱 or 手机） | string                                                               | N    | email  |
| currentLocale | 国际化                                 | string                                                               | N    | zh-CN  |
| sendVerify    | 手机号获取验证码()                     | Function                                                             | N    | -      |
| onExisting    | 点击已有账号触发                       | Function                                                             | N    | -      |

