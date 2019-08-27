import React from 'react'
import { Select } from 'antd'
import styled from 'styled-components'
import { SelectProps } from 'antd/lib/select'

export interface ITagProps {
  /**
   * tags值发生变化事件触发
   */
  onChange?: (value: any) => void
  /**
   * 添加标签按钮文案
   */
  addText?: string
  /**
   * 是否处于禁止状态
   */
  disabled?: boolean
  /**
   * 是否控制tags的值
   */
  value?: string[]
  /**
   * 默认值
   */
  defaultValue?: string[]
}

const noop = () => {
  console.log('empty function')
}
const StyledSelect = styled((props: SelectProps) => <Select {...props} />)`
  width: 250px;
  > .ant-select-selection {
    background: none;
    border: none;
  }
  .tags-dropdown {
    display: none;
  }
  .ant-select-selection {
    box-shadow: none !important;
  }
  .ant-select-search--inline .ant-select-search__field__wrap {
    position: relative;
    width: 40px;

    &::after {
      content: "${(props: any) => props.addText || '+ 标签'}";
      display: inline-block;
      position: absolute;
      box-sizing: content-box;
      top: 1px;
      left: 0;
      min-width: 40px;
      height: 20px;
      background: #fff;
      font-size: 12px;
      line-height: 20px;
      color: #aaa;
      cursor: pointer;
      text-align: center;
      border: 1px dashed #ddd;
    }
  }
  &.ant-select-open .ant-select-search--inline .ant-select-search__field__wrap {
    width: 60px;
    background: #fff;
    &::after {
      display: none;
    }
  }
  &.ant-select-disabled {
    width: 50px;
    .ant-select-selection {
      background: transparent;
    }
    .ant-select-search--inline .ant-select-search__field__wrap::after {
      cursor: not-allowed;
    }
  }
`
const Tag = (props: ITagProps) => {
  const { onChange = noop, ...rest } = props

  return (
    <StyledSelect
      mode="tags"
      {...rest}
      onChange={onChange}
      dropdownStyle={{ display: 'none' }}
    />
  )
}

export default Tag;
