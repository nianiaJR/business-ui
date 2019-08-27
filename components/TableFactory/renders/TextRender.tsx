import React from 'react'
import objectGet from 'lodash/get'

export interface IRenderProps {
  /**
   * 取值值字段
   */
  field: string,
  /**
   * 默认值
   */
  defaultValue?: string,
  /**
   * 取值转换函数
   * 
   * @default value => value
   */
  getter?: (value: any) => any
}

const defaultTransform = (value: any) => value

const TextRender = (props: IRenderProps) => (_: string, record: any) => {
  const { field, getter=defaultTransform, defaultValue='' } = props
  const text = objectGet(record, field, defaultValue)

  return <div className="text-render">
    {getter(text)}
  </div>
}

export default TextRender;
