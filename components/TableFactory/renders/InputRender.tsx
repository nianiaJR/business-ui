import React from 'react'
import { Input } from 'antd'
import objectGet from 'lodash/get'
import objectSet from 'lodash/set'
import styled from 'styled-components'


export interface IRenderProps {
  field: string,
  /**
   * 筛选项数组映射
   */
  defaultValue?: string
  /**
   * input触发调用 function(record, index, value?, field?) {}
   */
  onChange?: (newRecord: any, index: number, value?: any, field?: string) => {}
}

const noop = () => { }

const StyledInputRender = styled.div`
  .ant-input {
    min-width: 150px;
  }
`

const InputRender = (props: IRenderProps) => (_: any, record: any, index: number) => {
  const { field, onChange = noop, defaultValue } = props
  const value = objectGet(record, field, defaultValue)

  return (
    <StyledInputRender className="input-render">
      <Input
        value={value}
        onChange={(e: any) => {
          const v = e.target.value
          onChange(objectSet(record, field, v), index, v, field)
        }}
      />
    </StyledInputRender>
  )
}

export default InputRender;
