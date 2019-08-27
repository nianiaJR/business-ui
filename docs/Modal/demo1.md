## 代码片段
```javascript
import React from 'react'
import { Button } from 'antd'
import { Modal } from 'business-ui'

const Demo = () => {
  let updateModalHandler = null
  const handleInitModal = ref => {
      updateModalHandler = ref
      updateModalHandler.show()
  }
  const handleOk = () => {
    console.log('do ok things here')
    updateModalHandler.hide()
  }
  const handleCancel = () => {
    console.log('do cancel things here')
    updateModalHandler.hide()
  }
  return < Modal modalRef={handleInitModal} footer={null}>
    <div>
      this is modal content
    </div>
    <div>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button type="primary" onClick={handleOk}>Ok</Button>
    </div>
  </Modal>
}

ReactDom.render(<Demo />, mountNode)
```