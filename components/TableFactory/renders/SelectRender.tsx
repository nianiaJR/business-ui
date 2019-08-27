import React from 'react'
import { Select } from 'antd'
import objectGet from 'lodash/get'
import objectSet from 'lodash/set'
import styled from 'styled-components'

const { Option } = Select

interface IOption {
  label: string,
  value: string
}

export interface IRenderProps {
  field: string,
  /**
   * 筛选项数组映射
   */
  optionsMapFn?: (record: any) => Array<IOption>,
  /**
   * 筛选项数组，与筛选项映射二选一
   */
  options?: Array<IOption>,
  /**
   * 默认值
   */
  defaultValue?: string
  /**
   * select触发调用 function(record, index) {}
   */
  onChange?: (newRecord: any, index: number, value?: any, field?: string) => {} 
}

const noop = () => {}

const StyledSelectRender = styled.div`
  .ant-select {
    min-width: 150px;
  }
`

const SelectRender = (props: IRenderProps) => (_: any, record: any, index: number) => {
  const { field, optionsMapFn, options, onChange=noop, defaultValue } = props
  const opts = optionsMapFn ? optionsMapFn(record) : options
  const value = objectGet(record, field, defaultValue)

  return (
    <StyledSelectRender className="select-render">
      <Select
        value={value}
        onChange={(v: string) => {
          onChange(objectSet(record, field, v), index, v, field)
        }}
      >
        {
          opts.map(p => <Option key={p.value} value={p.value}>{p.label}</Option>)
        }
      </Select>
    </StyledSelectRender>
  )
}

export default SelectRender;
