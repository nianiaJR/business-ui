import React from 'react'
import { storiesOf } from '@storybook/react'

import { LoadTableList, LoadTableListRequestMethods } from '../components'
import api from '../docs/LoadTableList/api.md'
import doc1 from '../docs/LoadTableList/demo1.md'
import doc2 from '../docs/LoadTableList/demo2.md'
import doc3 from '../docs/LoadTableList/demo3.md'
import doc4 from '../docs/LoadTableList/demo4.md'
import doc5 from '../docs/LoadTableList/demo5.md'
import Collapse from '../story-utils/Collapse'
import { Button } from 'antd'
import Summary from '../story-utils/Summary';

const handleRequest = res => {
  if (res.status === 200 && res.data.code === '0') {
    const { pagination, records } = res.data.data
    return {
      list: records,
      total: pagination.total
    }
  }
}
const handleSelectChange = (selectedRowKeys, selectedRows) => {
  console.log(selectedRowKeys, selectedRows, '<<<<<<<')
}
storiesOf('LoadTableList-请求表格列表', module)
  .addParameters({
    info: {
      source: false,
      propTables: null
    }
  })
  .add('带分页的列表', () => (
    <>
      <Summary name="LoadTableList"></Summary>
      <LoadTableList
        api={() => 'http://apistore.taobao.org/mock/846/api/load-table-list'}
        handleRequest={handleRequest}
        columns={[
          {
            title: '设备名称',
            dataIndex: 'ipcName'
          },
          {
            title: '设备码',
            dataIndex: 'sn'
          },
          {
            title: '设备状态',
            dataIndex: 'ipcStatus'
          }
        ]}
        filterParams={{
          search: 'searchText'
        }}
        headers={{
          Authorization: 'token'
        }}
        pageConfig={{
          pageSize: 3,
          defaultCurrent: 1,
          mappings: {
            current: 'pageIndex'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6']
        }}
        rowKey={record => record.sn}
        changeCallback={pagination => {console.log(pagination)}}
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc1} />
    </>
  ))
  .add('不带分页的列表', () => (
    <>
      <Summary name="LoadTableList"></Summary>
      <LoadTableList
        api={() => 'http://apistore.taobao.org/mock/846/api/load-table-list'}
        handleRequest={handleRequest}
        columns={[
          {
            title: '设备名称',
            dataIndex: 'ipcName'
          },
          {
            title: '设备码',
            dataIndex: 'sn'
          },
          {
            title: '设备状态',
            dataIndex: 'ipcStatus'
          }
        ]}
        filterParams={{
          search: 'all'
        }}
        headers={{
          Authorization: 'token'
        }}
        rowKey={record => record.sn}
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc2} />
    </>
  ))
  .add('表格可选状态', () => (
    <>
      <Summary name="LoadTableList"></Summary>
      <LoadTableList
        api={() => 'http://apistore.taobao.org/mock/846/api/load-table-list'}
        handleRequest={handleRequest}
        columns={[
          {
            title: '设备名称',
            dataIndex: 'ipcName'
          },
          {
            title: '设备码',
            dataIndex: 'sn'
          },
          {
            title: '设备状态',
            dataIndex: 'ipcStatus'
          }
        ]}
        filterParams={{
          search: 'searchText'
        }}
        headers={{
          Authorization: 'token'
        }}
        pageConfig={{
          pageSize: 3,
          defaultCurrent: 1,
          mappings: {
            current: 'pageIndex'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6']
        }}
        rowKey={record => record.sn}
        rowSelection={{
          onChange: handleSelectChange
        }}
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc3} />
    </>
  ))
  .add('控制表格数据重新加载数据', () => {
    let tableHandler = null

    return (
      <>
        <Summary name="LoadTableList"></Summary>
        <Button
          type="primary"
          onClick={() => tableHandler.reload()}
          style={{ marginBottom: 16 }}
        >
          重载
        </Button>
        <LoadTableList
          api={() => 'http://apistore.taobao.org/mock/846/api/load-table-list'}
          handleRequest={handleRequest}
          columns={[
            {
              title: '设备名称',
              dataIndex: 'ipcName'
            },
            {
              title: '设备码',
              dataIndex: 'sn'
            },
            {
              title: '设备状态',
              dataIndex: 'ipcStatus'
            }
          ]}
          filterParams={{
            search: 'searchText'
          }}
          headers={{
            Authorization: 'token'
          }}
          pageConfig={{
            pageSize: 3,
            defaultCurrent: 1,
            mappings: {
              current: 'pageIndex'
            },
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6']
          }}
          rowKey={record => record.sn}
          handler={handler => {
            tableHandler = handler
          }}
        />
        <Collapse apiMarkdown={api} codeMarkdown={doc4} />
      </>
    )
  })
  .add('前端控制分页', () => (
    <>
      <Summary name="LoadTableList"></Summary>
      <LoadTableList
        api={() => 'http://apistore.taobao.org/mock/846/api/load-table-list'}
        handleRequest={handleRequest}
        columns={[
          {
            title: '设备名称',
            dataIndex: 'ipcName'
          },
          {
            title: '设备码',
            dataIndex: 'sn'
          },
          {
            title: '设备状态',
            dataIndex: 'ipcStatus'
          }
        ]}
        filterParams={{
          search: 'all'
        }}
        headers={{
          Authorization: 'token'
        }}
        pageConfig={{
          pageSize: 3,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6']
        }}
        rowKey={record => record.sn}
        frontPaging
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc5} />
    </>
  ))
  .add('支持POST请求并可配置传递参数', () => (
    <>
      <Summary name="LoadTableList"></Summary>
      <LoadTableList
        api={() => 'http://apistore.taobao.org/mock/846/api/load-table-list'}
        handleRequest={handleRequest}
        requestMethod={LoadTableListRequestMethods.POST}
        transformParams={params => {
          const { pageIndex, pageSize, search } = params
          // 修改要传递的请求参数
          return {
            offset: (pageIndex - 1) * pageSize,
            search,
            pageSize
          }
        }}
        columns={[
          {
            title: '设备名称',
            dataIndex: 'ipcName'
          },
          {
            title: '设备码',
            dataIndex: 'sn'
          },
          {
            title: '设备状态',
            dataIndex: 'ipcStatus'
          }
        ]}
        filterParams={{
          search: 'searchText'
        }}
        headers={{
          Authorization: 'token'
        }}
        pageConfig={{
          pageSize: 3,
          defaultCurrent: 1,
          mappings: {
            current: 'pageIndex'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6']
        }}
        rowKey={record => record.sn}
        changeCallback={pagination => {console.log(pagination)}}
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc1} />
    </>
  ))
