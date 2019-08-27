### 代码片段
```javascript
import { Login, LoginMode } from 'business-ui'

ReactDOM.render(
    <Login mode={LoginMode.email} onLogin={() => alert('触发登录')} />,
    mountNode
);

```
