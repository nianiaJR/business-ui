### 代码片段
```javascript
import { Login, LoginMode } from 'business-ui'

ReactDOM.render(
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
    />,
    mountNode
);

```