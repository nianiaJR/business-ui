### 代码片段
```javascript
import { LoadTableList } from 'business-ui'
const handleRequest = res => {
  if (res.status === 200 && res.data.code === '0') {
    const { pagination, records } = res.data.data
    return {
      list: records,
      total: pagination.total
    }
  }
}
let tableHandler = null

ReactDOM.render(
  <>
    <Button type="primary" onClick={() => tableHandler.reload()} style={{ marginBottom: 16 }}>重载</Button>
    <LoadTableList
      api={() => "http://apistore.taobao.org/mock/846/api/load-table-list"}
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
        pageSizeOptions: ['3', '6', '10']
      }}
      rowKey={record => record.sn}
      handler={handler => {
        tableHandler = handler
      }}
    ></LoadTableList>
  </>
, mountNode)
```