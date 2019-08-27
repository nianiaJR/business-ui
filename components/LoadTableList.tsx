import React, { Component } from 'react'
import { Table } from 'antd'
import { ColumnProps, TableProps } from 'antd/lib/table'
import styled from 'styled-components'
import axios from 'axios'
import { PaginationProps } from 'antd/lib/pagination'

import { camelJson } from './utils/helper'
import LoadTableListRequestMethods from './LoadTableListRequestMethods'

interface IResult {
  list: any[]
  total?: number
}

interface IPaginationMappings {
  /**
   * 每页大小字段映射
   */
  pageSize?: string
  /**
   * 当前页码映射
   */
  current?: string
}

interface IPageConfig extends PaginationProps {
  /**
   * 每页大小
   */
  pageSize: number
  /**
   * 初始页码
   */
  defaultCurrent?: number
  /**
   * 用于请求时分页字段的映射
   */
  mappings?: IPaginationMappings
}

interface ITableHandler {
  /**
   * 列表数据恢复初始化
   */
  reload: (reset?: boolean) => void
}

interface IChangeCallbackPagination {
  current: number
  pageSize: number
}

interface ILoadTableListProps {
  /**
   * 表格请求接口
   */
  api: string | (() => string)
  /**
   * 请求适配处理
   */
  handleRequest: (res: any) => IResult
  /**
   * 表格列渲染配置
   */
  columns: Array<ColumnProps<any>>
  /**
   * 表格每行的key值
   */
  rowKey: (record: any) => string
  /**
   * 表格筛选参数
   */
  filterParams?: any
  /**
   * 表格分页配置
   */
  pageConfig?: IPageConfig
  /**
   * 请求上传头部
   */
  headers?: object
  /**
   * 是否展示loading效果
   * @default true
   */
  showLoading?: boolean
  /**
   * 表格行是否可选择
   */
  rowSelection?: object
  /**
   * 表格列表控制句柄
   */
  handler?: (ref: ITableHandler) => void
  /**
   * 是否前端独立来控制数据的分页
   * @default false
   */
  frontPaging?: boolean
  /**
   * 页码改变或者每页数改变的回调
   */
  changeCallback?: (pagination: IChangeCallbackPagination) => void
  /**
   * 请求方式
   * @default LoadTableListRequestMethods.GET
   */
  requestMethod?: LoadTableListRequestMethods
  /**
   * 修改请求传递参数
   */
  transformParams?: (params: object) => object
}

interface ILoadTableListState {
  list: any[]
  pagination?: any
  loading?: boolean
}

const StyledTable = styled((props: TableProps<any>) => <Table {...props} />)``

export default class LoadTableList extends Component<
  ILoadTableListProps,
  ILoadTableListState
> {
  constructor(props: ILoadTableListProps) {
    super(props)

    const initialState: ILoadTableListState = {
      list: []
    }
    if (props.pageConfig) {
      const { pageSize, defaultCurrent = 1 } = props.pageConfig
      initialState.pagination = {
        pageSize,
        current: defaultCurrent,
        total: 0
      }
    }

    const { showLoading = true } = props
    if (showLoading) {
      initialState.loading = false
    }
    this.state = initialState
  }

  componentDidMount() {
    this.getList()
    const { handler } = this.props
    if (handler) {
      handler({
        reload: this.reload
      })
    }
  }

  reload = (reset = true) => {
    this.setState(s => {
      if (reset && s.pagination) {
        // 重载恢复到第一页
        return {
          pagination: {
            ...s.pagination,
            current: 1
          }
        }
      }
      return null
    }, () => {
        // 判断是否需要调用页码变化的回调函数
        if (reset && this.state.pagination && this.props.changeCallback) {
          this.props.changeCallback({
            current: 1,
            pageSize: this.state.pagination.pageSize
          })
        }
        this.getList()
    })
  }

  getList = async () => {
    const {
      api,
      headers = {},
      filterParams = {},
      pageConfig,
      handleRequest,
      showLoading = true,
      frontPaging,
      requestMethod = LoadTableListRequestMethods.GET,
      transformParams = (params: object) => params
    } = this.props
    const { pagination } = this.state
    let _api
    if (!api) {
      console.error('the "api" value isn\'t existed')
      return
    }
    _api = typeof api === 'function' ? api() : api

    const params = {} as any
    if (!frontPaging && pagination) {
      const { current, pageSize } = pagination
      const { mappings } = pageConfig as IPageConfig
      if (mappings) {
        params[mappings.current || 'current'] = current
        params[mappings.pageSize || 'pageSize'] = pageSize
      } else {
        params.current = current
        params.pageSize = pageSize
      }
    }

    if (showLoading) {
      this.setState({
        loading: true
      })
    }
    try {
      let res;
      if (requestMethod === LoadTableListRequestMethods.GET) {
        res = await axios.get(_api, {
          params: transformParams({
            ...filterParams,
            ...params
          }),
          headers
        })
      } else {
        res = await axios.post(_api, transformParams({
          ...filterParams,
          ...params
        }), {
          headers
        })
      }

      if (handleRequest) {
        const result = handleRequest(camelJson(res))
        if (result) {
          const { list, total } = result
          this.setState(s => {
            const updateState = {
              list
            } as any
            if (s.pagination) {
              updateState.pagination = {
                ...s.pagination,
                total
              }
            }

            return updateState
          })
        }
      } else {
        console.error('the "handleRequest" api isn\'t existed.')
      }
    } catch (e) {
      console.log(e)
    }
    if (showLoading) {
      this.setState({
        loading: false
      })
    }
  }

  handleChange = (pagination: any) => {
    const { frontPaging } = this.props
    this.setState(
      s => {
        return {
          pagination: {
            ...s.pagination,
            current: pagination.current,
            pageSize: pagination.pageSize
          }
        }
      },
      () => {
        if (this.props.changeCallback) {
          this.props.changeCallback({
            current: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize
          })
        }
        if (!frontPaging) {
          this.getList()
        }
      }
    )
  }

  render() {
    const {
      columns,
      showLoading = true,
      rowKey,
      pageConfig,
      rowSelection
    } = this.props
    const { pagination, loading, list } = this.state
    const page = pageConfig
      ? {
          ...pageConfig,
          ...pagination
        }
      : false

    return (
      <StyledTable
        className="business-table"
        dataSource={list}
        columns={columns}
        pagination={page}
        loading={showLoading && loading}
        onChange={this.handleChange}
        rowKey={rowKey}
        key={rowSelection && `page-${pagination ? pagination.current : 'none'}`} // 只有需要选择的时候，为了保证换页后选择恢复默认状态，需要绑定key
        rowSelection={rowSelection}
      />
    )
  }
}
