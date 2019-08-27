### 代码片段
```javascript
import { LoadList } from 'business-ui'

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
  <LoadList
    api={() =>
      'http://apistore.taobao.org/mock/846/api/load-list?pageSize=6&pageIndex=1'
    }
    handleRequest={handleRequest}
    filterParams={{
      search: 'searchText'
    }}
    headers={{
      Authorization: 'token'
    }}
    rowKey={record => record.sn}
  >
    {item => (
      <ul style={{ textAlign: 'left' }}>
        <li>设备id: {item.ipcId}</li>
        <li>设备名称: {item.ipcName}</li>
        <li>设备sn: {item.sn}</li>
      </ul>
    )}
  </LoadList>,
  mountNode
)
```