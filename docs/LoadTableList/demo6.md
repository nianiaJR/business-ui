### 代码片段

```javascript
import { LoadTableList, LoadTableListRequestMethods } from 'business-ui'
const handleRequest = res => {
  if (res.status === 200 && res.data.code === '0') {
    const { pagination, records } = res.data.data
    return {
      list: records,
      total: pagination.total
    }
  }
}

ReactDOM.render(
  <LoadTableList
      api={() => 'http://apistore.taobao.org/mock/846/api/load-table-list'}
      handleRequest={handleRequest}
      // 使用POST来发请求
      requestMethod={LoadTableListRequestMethods.POST}
      // 修改请求数据传参
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
    />,
  mountNode
)
```
