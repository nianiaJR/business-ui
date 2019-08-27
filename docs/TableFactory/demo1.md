### 代码片段

```javascript
...
import { TableFactory } from '../components'

const {
  ImageTextRender,
  TextRender,
  SelectRender,
  InputRender,
  DatePickerRender
} = TableFactory.render

const Demo1 = () => {
    const [dataSource, setDataSource] = useState([
      {
        id: '1',
        data: {
          text: '文案1'
        },
        image: 'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg',
        imageId: '20161124_063444__00000000.jpg',
        level: {
          options: [1, 2, 3, 4],
          value: 1,
        },
        color: 'red',
        comment: '我是备注1',
        date: + new Date('2019-01-02')
      },
      {
        id: '2',
        data: {
          text: '文案2'
        },
        image: 'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg',
        imageId: '20161124_063444__00000002.jpg',
        level: {
          options: [1,2,3,4],
          value: 2,
        },
        color: 'blue',
        comment: '我是备注2',
        date: + new Date('2019-04-02')
      },
      {
        id: '3',
        data: {
          text: '文案3'
        },
        image: 'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpx',
        imageId: '20161124_063444__00000003.jpg',
        level: {
          options: [1,2,3,4],
          value: 3,
        },
        color: 'red'
      }
    ])


    const columns = [
      {
        title: '文案',
        key: 'text',
        render: TextRender({
          field: 'data.text', // 支持对象点钻取值
          defaultValue: '-',
        })
      },
      {
        title: '图片',
        render: ImageTextRender({
          textField: 'imageId',
          defaultText: '-',
          imageField: 'image',
          defaultImage: 'http://thevalleyorchard.com/wp-content/uploads/2017/09/pict-error-cloud-round-icons-vector-stencils-library.png',
          errorUrl: 'http://thevalleyorchard.com/wp-content/uploads/2017/09/pict-error-cloud-round-icons-vector-stencils-library.png',
          onView: record => {
            alert(`点击图片：${record.imageId}`)
          }
        })
      },
      {
        title: '级别选择',
        render: SelectRender({
          field: 'level.value',
          optionsMapFn: record => { // 配置筛选项映射函数
            return record.level.options.map(l => {
              return {
                label: '级别' + l,
                value: l
              };
            })
          },
          onChange: (newRecord, index) => {
            dataSource[index] = newRecord
            setDataSource([...dataSource])
          }
        })
      },
      {
        title: '颜色选择',
        render: SelectRender({
          field: 'color',
          options: [
            {
              label: '红色',
              value: 'red'
            },
            {
              label: '蓝色',
              value: 'blue'
            }
          ],
          onChange: (newRecord, index) => {
            dataSource[index] = newRecord
            setDataSource([...dataSource])
          }
        })
      },
      {
        title: '备注',
        render: InputRender({
          field: 'comment',
          defaultValue: '默认备注',
          onChange: (newRecord, index) => {
            dataSource[index] = newRecord
            setDataSource([...dataSource])
          }
        })
      },
      {
        title: '记录时间',
        render: DatePickerRender({
          field: 'date',
          getter: timestamps => moment(timestamps), // 设值值转换函数
          setter: dateObj => +dateObj, // 设值更新数据时，对应的转换函数 
          onChange: (newRecord, index) => {
            dataSource[index] = newRecord
            setDataSource([...dataSource])
          }
        })
      }
    ]

    return (
      <TableFactory
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
      />
    )
}
```