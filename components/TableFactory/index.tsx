import React from 'react'
import { Table } from 'antd'

import ImageTextRender from './renders/ImageTextRender'
import TextRender from './renders/TextRender'
import SelectRender from './renders/SelectRender'
import InputRender from './renders/InputRender'
import DatePickerRender from './renders/DatePickerRender'

interface ITableFactoryProps {
  /**
   * 表格列项定义, 同antd
   */
  columns: Array<any>
  /**
   * 数据源，同antd
   */
  dataSource: Array<any>
  /**
   * 行字段key值
   */
  rowKey: any,
  /**
   * 其他表格配置参数，同antd
   */
  otherProps?: any
}

const TableFactory = (props: ITableFactoryProps) => {
  const { columns, dataSource, rowKey, otherProps={} } = props

  return (
    <Table
      className="business-table"
      columns={columns}
      rowKey={rowKey}
      dataSource={dataSource}
      {...otherProps}
    />
  )
}

TableFactory.render = {
  ImageTextRender,
  TextRender,
  SelectRender,
  InputRender,
  DatePickerRender
}

export default TableFactory;
