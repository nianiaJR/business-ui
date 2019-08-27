### 接口描述 - LoadTableList
| 属性          | 说明                                                                                     | 类型                    | 必须 | 默认值 |
| ------------- | ---------------------------------------------------------------------------------------- | ----------------------- | ---- | ------ |
| api           | 表格数据请求接口                                                                         | string or () => string  | Y    | -      |
| handleRequest | 请求适配处理                                                                             | (response) => IResult   | Y    | -      |
| columns       | 表格列表渲染配置                                                                         | Array<ColumnProps>      | Y    | -      |
| rowKey        | 表格每行的key值                                                                          | () => string            | Y    | -      |
| filterParams  | 表格请求接口时需要的筛选项                                                               | object                  | N    | -      |
| pageConfig    | 分页信息配置                                                                             | IPageConfig             |      | -      |
| headers       | http请求头信息                                                                           | object                  | N    | -      |
| showLoading   | 在数据请求时，是否需要展示loading                                                        | boolean                 | N    | -      |
| rowSelection  | 表格是否可选，参考[antd选择配置项](https://ant.design/components/table-cn/#rowSelection) |                         | N    | -      |
| handler       | 传递表格列表控制器的函数回调                                                             | (ITableHandler) => void | N    | -      |
| frontPaging   | 是否前端来独立控制数据分页                                                               | Boolean                 | N    | false  |
| changeCallback   | 页码改变或者每页数改变的回调                                                     | (IChangeCallbackPagination) => void        | N    | -  |
| requestMethod   | 数据请求的方式 |  LoadTableListRequestMethods       |  N   | LoadTableListRequestMethods.GET  |
| transformParams | 修改请求数据的中间件处理方法 | params => object        | N    | -  |

### IResult
| 属性  | 说明       | 类型       | 必须 | 默认值 |
| ----- | ---------- | ---------- | ---- | ------ |
| list  | 列表数据   | Array<any> | Y    |        |
| total | 列表总数量 | number     | N    |        |

### IPageConfig
| 属性           | 说明                          | 类型                | 必须 | 默认值 |
| -------------- | ----------------------------- | ------------------- | ---- | ------ |
| pageSize       | 每页大小                      | number              | Y    |        |
| defaultCurrent | 初始化页码                    | number              | N    |        |
| mappings       | api query上分页信息的映射关系 | IpaginationMappings | N    |        |

### IPaginationMappings
| 属性     | 说明             | 类型   | 必须 | 默认值 |
| -------- | ---------------- | ------ | ---- | ------ |
| pageSize | 每页大小字段映射 | string | N    |        |
| current  | 当前页码字段映射 | string | N    |        |

### ITableHandler
| 属性   | 说明                                                                  | 类型                  | 必须 | 默认值 |
| ------ | --------------------------------------------------------------------- | --------------------- | ---- | ------ |
| reload | 重新加载数据, reset代表是否要让页码等请求数据恢复到第一页，默认为true | (reset:boolean)=>void | N    |        |

### IChangeCallbackPagination
| 属性   | 说明                                                                  | 类型                  | 必须 | 默认值 |
| ------ | --------------------------------------------------------------------- | --------------------- | ---- | ------ |
| current | 切换后的当前页码 | number | Y    |        |
| pageSize | 切换后的每页条数 | number | Y    |        |