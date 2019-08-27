### 代码片段
```javascript
import { Login, LoginMode } from 'business-ui'

ReactDOM.render(
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
    </>,
    mountNode
);

```