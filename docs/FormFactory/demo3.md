### 代码片段
```javascript
import { FormFactory, FormTypes } from 'business-ui'
import { Form } from 'antd'

// FormFactory组件需要搭配antd的Form表单套件一起使用，所以组件外部需要套上Form.create()的高阶组件
const Demo3 = Form.create()((props) => {
  const basicConfig = [
    {
      type: FormTypes.Input,
      label: 'Validation Task Name',
      key: 'name',
      rules: [{
        required: true,
      }],
    },
    {
      type: FormTypes.Select,
      label: 'Algorithm Task Type',
      key: 'taskType',
      placeholder: 'xxxx',
      rules: [{
        required: true,
      }],
      options: [
        {
          label: 'A',
          value: 'a'
        },
        {
          label: 'B',
          value: 'b'
        }
      ],
      placeholder: 'Choose Algorithm Task Type',
    },
    {
      type: FormTypes.Custom,
      render: () => {
        return <Divider>选填内容（表单自定义部分）</Divider>
      }
    },
    {
      type: FormTypes.Input,
      label: 'Project',
      key: 'project',
    },
    {
      type: FormTypes.TextArea,
      label: 'Description',
      key: 'desc',
    },
    {
      type: FormTypes.Tag,
      label: 'Tag',
      key: 'tag'
    }
  ]

  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
        if (!err) {
          message.info(`表单值: ${JSON.stringify(values)}`)
        }
      })
    }

    return (
      <>
        <FormFactory config={basicConfig} form={props.form} />
        <Button type="primary" onClick={handleSubmit}>提交</Button>
      </>
    )
})
ReactDOM.render(<Demo2/>, mountNode)
```