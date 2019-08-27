### 代码片段
```javascript
import { FormFactory, FormTypes } from 'business-ui'
import { Form } from 'antd'

// 由于表单工厂是基于antd的Form套件进行封装的，所以使用的时候需要在外层调用Form.create()来包裹组件
const Demo1 = Form.create()((props) => {
  const config = [
      {
        type: FormTypes.Input,
        label: '姓名',
        key: 'name',
        placeholder: '请输入姓名',
        rules: [
          {
            min: 3,
            required: true
          }
        ]
      },
      {
        type: FormTypes.InputNumber,
        label: '年龄',
        key: 'age'
      },
      {
        type: FormTypes.RadioButton,
        label: '性别',
        key: 'sex',
        initialValue: 'male',
        disabled: true,
        options: [
          {
            label: '男',
            value: 'male'
          },
          {
            value: 'female',
            label: '女'
          }
        ]
      },
      {
        combo: [
          {
            type: FormTypes.Select,
            label: '地址',
            key: 'country',
            initialValue: 'China',
            options: [
              {
                label: '中国',
                value: 'China'
              },
              {
                label: '美国',
                value: 'America'
              }
            ]
          },
          {
            type: FormTypes.Select,
            initialValue: 'Beijing',
            key: 'province',
            options: [
              {
                label: '北京',
                value: 'Beijing'
              },
              {
                label: '上海',
                value: 'Shanghai'
              }
            ]
          },
          {
            type: FormTypes.Input,
            placeholder: '请输入城市',
            key: 'city'
          }
        ],
        label: '地址'
      },
      {
        label: '身份',
        key: 'role',
        type: FormTypes.Radio,
        options: [
          {
            label: '会员',
            value: 'citizen'
          },
          {
            label: '访客',
            value: 'visitor'
          }
        ]
      },
      {
        type: FormTypes.Checkbox,
        key: 'task',
        label: '处理事项',
        options: [
          {
            label: '访客',
            value: 'visit'
          },
          {
            label: '移民',
            value: 'migrate'
          }
        ]
      },
      {
        combo: [
          {
            type: FormTypes.DatePicker,
            key: 'date',
            label: '日期',
            placeholder: '选择日期'
          },
          {
            type: FormTypes.TimePicker,
            key: 'time',
            label: '时间',
            placeholder: '选择时间'
          }
        ],
        label: '时间'
      },
      {
        type: FormTypes.TextArea,
        label: '备注',
        key: 'description',
        placeholder: '请留言'
      },
      {
        type: FormTypes.Slider,
        label: '满意度',
        key: 'satisfication',
        formProps: {
          min: 0,
          max: 10
        }
      },
      {
        type: FormTypes.Switch,
        label: '接收通知',
        key: 'notification',
        formProps: {
          checkedChildren: '接收',
          unCheckedChildren: '不收'
        }
      },
      {
        type: FormTypes.Rate,
        label: '重要度',
        key: 'importance',
        formProps: {
          count: 5
        }
      },
      {
        type: FormTypes.Tag,
        label: '标签',
        key: 'tag'
      },
      {
        type: FormTypes.Upload,
        label: '文件',
        key: 'file',
        uploadRender: '上传',
        formProps: {
          listType: 'picture-card',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        }
      }
  ]

  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        message.info(`表单值: ${JSON.stringify(values)}`)
      }
    })
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    }
  }

  return (
    <>
      // 组件的使用方式
      <FormFactory config={config} form={props.form} formItemLayout={formItemLayout} />
      <Button type="primary" onClick={handleSubmit}>提交</Button>
    </>
  )
})

ReactDom.render(<Demo1 />, mountNode)
```