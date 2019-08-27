import React from 'react'
import {
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  InputNumber,
  Slider,
  Rate,
  Switch,
  Upload
} from 'antd'
import styled from 'styled-components'
import { FormProps } from 'antd/lib/form'
import Tag from './Tag'
import FormTypes from './FormTypes'

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const CheckboxGroup = Checkbox.Group

interface IOption {
  value: any
  label: string
}

interface IFormItem {
  /**
   * 表单类型
   */
  type: FormTypes
  /**
   * 表单绑定key值
   */
  key: string
  /**
   * 表单名称
   */
  label?: string
  /**
   * 提示
   */
  placeholder?: string
  /**
   * 表单选项配置，比如select
   */
  options?: IOption[]
  /**
   * 初始化值
   */
  initialValue?: any
  /**
   * 一行多表单组合
   */
  combo?: IFormItem[] // 仅支持到二级
  /**
   * 当存在一行多表单时，是否需要分隔符
   */
  divider?: any
  /**
   * 表单值变化的事件触发
   */
  onChange?: (event: any) => {}
  /**
   * 是否禁用表单
   */
  disabled?: boolean
  /**
   * 上传文件区触发按钮自定义
   */
  uploadRender?: any
  /**
   * 表单值校验
   */
  rules?: any
  /**
   * 关于表单更详细的配置，具体参见antd表单各个类型支持的api
   */
  formProps?: any
  /**
   * 自定义类型的render类容
   */
  render?: any
  /**
   * 子项的表单布局
   */
  formItemLayout?: any
}

interface IFormFactoryProps {
  config: IFormItem[]
  form: any
  formItemLayout?: any
}

const noop = () => {
  console.log('empty function')
}

const renderFormComponent = (item: IFormItem) => {
  const {
    type,
    placeholder,
    onChange = noop,
    options = [],
    formProps = {},
    disabled,
    uploadRender
  } = item

  switch (type) {
    case FormTypes.Input:
      return (
        <Input
          placeholder={placeholder}
          onChange={onChange}
          {...formProps}
          disabled={disabled}
        />
      )
    case FormTypes.TextArea:
      return (
        <TextArea
          placeholder={placeholder}
          onChange={onChange}
          autosize={false}
          {...formProps}
          disabled={disabled}
        />
      )
    case FormTypes.Select:
      return (
        <Select onChange={onChange} disabled={disabled} {...formProps}>
          {options.map(o => (
            <Option value={o.value} key={o.value}>
              {o.label}
            </Option>
          ))}
        </Select>
      )
    case FormTypes.Radio:
      return (
        <RadioGroup onChange={onChange} options={item.options} disabled={disabled} {...formProps} />
      )
    case FormTypes.RadioButton:
      return (
        <RadioGroup onChange={onChange} disabled={disabled} {...formProps}>
          {options.map(o => (
            <RadioButton value={o.value} key={o.value}>
              {o.label}
            </RadioButton>
          ))}
        </RadioGroup>
      )
    case FormTypes.Checkbox:
      return (
        <CheckboxGroup onChange={onChange} disabled={disabled} {...formProps}>
          {options.map(o => (
            <Checkbox value={o.value} key={o.value}>
              {o.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      )
    case FormTypes.DatePicker:
      return (
        <DatePicker
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...formProps}
        />
      )
    case FormTypes.TimePicker:
      return (
        <TimePicker
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...formProps}
        />
      )
    case FormTypes.Tag:
      return <Tag onChange={onChange} disabled={disabled} {...formProps} />
    case FormTypes.Slider:
      return <Slider onChange={onChange} disabled={disabled} {...formProps} />
    case FormTypes.Switch:
      return <Switch onChange={onChange} {...formProps} />
    case FormTypes.Rate:
      return <Rate onChange={onChange} {...formProps} />
    case FormTypes.Upload:
      return <Upload onChange={onChange} {...formProps}>{uploadRender || 'upload'}</Upload>
    case FormTypes.InputNumber:
      return <InputNumber onChange={onChange} {...formProps} />
    default:
      return null
  }
}

const renderItem = (item: IFormItem, form: any, isCombo: boolean) => {
  const { getFieldDecorator } = form
  const { key, label, rules, initialValue, formItemLayout = {}, } = item
  if (item.type === FormTypes.Custom) {
    return item.render()
  }

  const FormComponent = renderFormComponent(item)
  if (!FormComponent) {
    console.error(`没有类型为 ${item.type} 的表单，请修改配置`)
    return null
  }

  if (isCombo) {
    return (
      getFieldDecorator(key, {
        rules,
        validateFirst: true,
        initialValue
      })(FormComponent)
    )
  }

  return (
    <FormItem label={label} className={item.key} key={item.key} {...formItemLayout}>
      {getFieldDecorator(key, {
        rules,
        validateFirst: true,
        initialValue
      })(FormComponent)}
    </FormItem>
  )
}

const StyledForm = styled((props: FormProps) => <Form {...props} />)`
  background: #fff;
  padding: 16px;
  > .child-forms { 
    display: flex;
    align-items: center;

    .ant-form-item-children {
      display: flex;

      > * + * {
        margin-left: 16px;
      }
    }
  }

  textarea {
    resize: none;
  }
` as any

const FormFactory = (props: IFormFactoryProps) => {
  const { config = [], form, formItemLayout = { labelCol: { span: 6 },  wrapperCol: { span: 18 }} } = props

  return (
    <StyledForm className="business-form" {...formItemLayout}>
      {config.map((item, index) =>
        item.combo ? (
          <FormItem className="child-forms" label={item.label}>
            {item.combo.map(childItem => renderItem(childItem, form, true))}
          </FormItem>
        ) : (
          renderItem(item, form, false)
        )
      )}
    </StyledForm>
  )
}

export default FormFactory
