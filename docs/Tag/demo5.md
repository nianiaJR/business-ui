### 代码片段
```javascript
import { Tag } from 'business-ui'

() => {
  const handleChange = (value) => {
    alert(`当期tags值改变为：${JSON.stringify(value)}`)
  }

  return (
    <Tag onChange={handleChange} addText="+ 标签" disabled />
  )
}
```