import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Button, message } from 'antd'
import { Divider } from 'antd'
import Collapse from '../story-utils/Collapse'
import { FormFactory, FormTypes } from '../components'
import doc1 from '../docs/FormFactory/demo1.md'
import doc2 from '../docs/FormFactory/demo2.md'
import doc3 from '../docs/FormFactory/demo3.md'
import apiDoc from '../docs/FormFactory/api.md'

const FormDecorator = storyFn => {
  const Component = Form.create()(storyFn)

  return <Component />
}
storiesOf('表单.FormFactory-表单工厂', module)
  .addDecorator(FormDecorator)
  .addParameters({
    info: {
      source: false,
      propTables: null
    }
  })
  .add('常规组合', props => {
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
        <FormFactory config={config} form={props.form} formItemLayout={formItemLayout} />
        <Button type="primary" onClick={handleSubmit} style={{ display: 'block', margin: 'auto' }}>
          提交
        </Button>
        <Collapse apiMarkdown={apiDoc} codeMarkdown={doc1} />
      </>
    )
  })

  .add('实际案例-AI平台级工具链-创建各类任务', props => {
    const basicConfig = [
      {
        type: FormTypes.Input,
        label: 'Validation Task Name',
        key: 'name',
        rules: [
          {
            required: true
          }
        ]
      },
      {
        type: FormTypes.Select,
        label: 'Algorithm Task Type',
        key: 'taskType',
        placeholder: 'xxxx',
        rules: [
          {
            required: true
          }
        ],
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
        placeholder: 'Choose Algorithm Task Type'
      },
      {
        type: FormTypes.Select,
        label: 'Val Profile',
        key: 'profile',
        rules: [
          {
            required: true
          }
        ],
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
        formProps: {
          mode: 'multiple'
        }
      },
      {
        type: FormTypes.Select,
        label: 'Val Params',
        key: 'params',
        rules: [
          {
            required: true
          }
        ],
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
        formProps: {
          mode: 'multiple'
        }
      },
      {
        type: FormTypes.Select,
        label: 'Images',
        key: 'images',
        rules: [
          {
            required: true
          }
        ],
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
        formProps: {
          showSearch: true
        }
      },
      {
        type: FormTypes.Select,
        label: 'Ground truth',
        key: 'gt',
        rules: [
          {
            required: true
          }
        ],
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
        formProps: {
          showSearch: true
        }
      },
      {
        type: FormTypes.Select,
        label: 'Prediction',
        key: 'pr',
        rules: [
          {
            required: true
          }
        ],
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
        formProps: {
          showSearch: true
        }
      },
      {
        type: FormTypes.Input,
        label: 'Project',
        key: 'project'
      },
      {
        type: FormTypes.TextArea,
        label: 'Description',
        key: 'desc'
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
        <Button type="primary" onClick={handleSubmit} style={{ display: 'block', margin: 'auto' }}>
          提交
        </Button>
        <Collapse apiMarkdown={apiDoc} codeMarkdown={doc2} />
      </>
    )
  })
  .add('表单内容中增加自定义渲染', props => {
    const basicConfig = [
      {
        type: FormTypes.Input,
        label: 'Validation Task Name',
        key: 'name',
        rules: [
          {
            required: true
          }
        ]
      },
      {
        type: FormTypes.Select,
        label: 'Algorithm Task Type',
        key: 'taskType',
        placeholder: 'xxxx',
        rules: [
          {
            required: true
          }
        ],
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
        placeholder: 'Choose Algorithm Task Type'
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
        key: 'project'
      },
      {
        type: FormTypes.TextArea,
        label: 'Description',
        key: 'desc'
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
        <Button type="primary" onClick={handleSubmit} style={{ display: 'block', margin: 'auto' }}>
          提交
        </Button>
        <Collapse apiMarkdown={apiDoc} codeMarkdown={doc3} />
      </>
    )
  })
