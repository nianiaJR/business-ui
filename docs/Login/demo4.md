### 代码片段
```javascript
import { Login, LoginMode } from 'business-ui'

ReactDOM.render(
    <Login mode={LoginMode.both} onLogin={() => alert('触发登录')} />,
    mountNode
);

```