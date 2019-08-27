### 接口描述 - LoadTableList
| 属性          | 说明                              | 类型                    | 必须 | 默认值 |
| ------------- | --------------------------------- | ----------------------- | ---- | ------ |
| api           | 表格数据请求接口                  | string or () => string  | Y    | -      |
| handleRequest | 请求适配处理                      | (response) => IResult   | Y    | -      |
| rowKey        | 表格每行的key值                   | () => string            | Y    | -      |
| filterParams  | 表格请求接口时需要的筛选项        | object                  | N    | -      |
| pageConfig    | 分页信息配置                      | IPageConfig             |      | -      |
| headers       | http请求头信息                    | object                  | N    | -      |
| showLoading   | 在数据请求时，是否需要展示loading | boolean                 | N    | -      |
| handler       | 传递表格列表控制器的函数回调      | (ITableHandler) => void | N    | -      |


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
| reload | 重新加载数据，reset代表是否要把页码等请求参数恢复到第一页，默认为true | (reset:boolean)=>void | N    |        |