### 代码片段
```javascript
import { Register } from 'business-ui'

ReactDOM.render(
    <Register
        type="email"
        onChooseMail={() => alert('邮箱注册')}
        onChoosePhone={() => alert('手机注册')}
        sendVerify={(number) => alert(`根据${number}获取验证码`)}
        onRegister={() => alert('注册')}
        onExisting={() => alert('已有账户')}
    />,
    mountNode
);

```