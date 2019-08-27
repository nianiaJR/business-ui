 ### 代码片段
```javascript
import { Tag } from 'business-ui'
import { Form, Button } from 'antd'

() => {
  const handleChange = (value) => {
    alert(`当期tags值改变为：${JSON.stringify(value)}`)
  }
  const DemoForm = Form.create()((props) => {
    const handleSubmit = () => {
      const tags = props.form.getFieldValue('tags')
      alert(`提交表单值-tags: ${tags}`)
    }

    const { getFieldDecorator } = props.form

    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('tags', {
              initialValue: ['aaa'],
            })(<Tag />)
          }
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    )
  })

  return (
    <DemoForm />
  )
}
```