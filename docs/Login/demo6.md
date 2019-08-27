### 代码片段
```javascript
import { Login, LoginMode } from 'business-ui'

ReactDOM.render(
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
  </>,
  mountNode
);

```