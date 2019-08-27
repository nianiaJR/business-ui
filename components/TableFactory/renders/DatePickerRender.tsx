import React from 'react'
import { DatePicker } from 'antd'
import objectGet from 'lodash/get'
import objectSet from 'lodash/set'
import styled from 'styled-components'
import moment from 'moment'


export interface IRenderProps {
  /**
   * 数据中对应的field值，支持点操作符
   */
  field: string,
  /**
   * 默认值
   * 支持 毫秒时间戳，日期字符串
   * @default moment Object
   */
  defaultValue: any,
  /**
   * 取值转换函数
   * 
   * @default value => value
   */
  getter?: (value: any) => any
  /**
   * 设值转换函数
   */
  setter?: (value: any) => any
  /**
   * 数据变化事件监听
   */
  onChange?: (newRecord: any, index: number, value?: any, field?: string) => {}
}

const StyledDatePickerRender = styled.div`
  .ant-calendar-picker {
    min-width: 200px;
  }
`

const defaultTransform = (value: any) => value

const DatePickerRender = (props: IRenderProps) => (_:any, record: any, index: number) => {
  const { field, defaultValue = moment(), getter=defaultTransform, setter=defaultTransform, onChange} = props;
  const value = objectGet(record, field, defaultValue)

  return <StyledDatePickerRender className="date-picker-render">
    <DatePicker value={defaultTransform(getter(value))} onChange={(v: any) => {
      objectSet(record, field, setter(v))
      onChange && onChange(record, index, setter(v), field)
    }} />
  </StyledDatePickerRender>
}

export default DatePickerRender;
