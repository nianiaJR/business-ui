
## 接口描述 - TableFactory
| 属性         | 说明         | 类型          | 必须 | 默认值 |
| ------------ | ------------ | ------------- | ---- | ------ |
| columns | 表格列项定义 | Array< [IColumn](https://ant.design/components/table-cn/#Column) > | Y    | -      |
| dataSource | 数据源 | Array<object> | Y    | -      |
| rowKey | 表格每行独有的key值 | string or record => key | Y    | -      |
| otherProps | 表格其他具体配置项, 同antd表单配置 | [ITable](https://ant.design/components/table-cn/#Table) | Y    | -      |

### TableFactory.render
#### ImageTextRender
| 属性         | 说明         | 类型          | 必须 | 默认值 |
| ------------ | ------------ | ------------- | ---- | ------ |
| imageField | 图片url对应字段 |  string | Y    | -      |
| textField | 文本对应字段 |  string | Y    | -      |
| errorUrl | 加载错误图片url |  string | N    | -      |
| defaultImage | 默认图片url |  string | N    | -      |
| defaultText | 默认文案 |  string | N    | -      |
| onView | 点击文案触发的操作函数 |  record => void| N    | -      |

#### TextRender
| 属性         | 说明         | 类型          | 必须 | 默认值 |
| ------------ | ------------ | ------------- | ---- | ------ |
| field | 取值字段 |  string | Y    | -      |
| defaultValue | 默认值 |  string | N    | -      |
| getter | 显示内容转化函数（例如：显示日期等信息时需要对真实值进行格式化） |  `value => { ... return newValue }` | N    | -      |

#### SelectRender 
| 属性         | 说明         | 类型          | 必须 | 默认值 |
| ------------ | ------------ | ------------- | ---- | ------ |
| field | 取值字段 |  string | Y    | -      |
| defaultValue | 默认值 |  string | N    | -      |
| onChange | 值发生改变时触发 | `(newRecord: any, index: number, value?: any, field?: string) => {}`  | N    | -      |
| options | 选择配置| `[{ label: '选项标题1', value: 'choice1' },  { label: '选项标题2', value: 'choice2' } ]` | N    | -      |
| optionsMapFn | 选项生成的映射函数（注：如果配置了options可忽略此项) | `record => { ... return[{ label: '选项标题1', value: 'choice1' },  { label: '选项标题2', value: 'choice2' } ]; }` | N    | -      |

#### InputRender
| 属性         | 说明         | 类型          | 必须 | 默认值 |
| ------------ | ------------ | ------------- | ---- | ------ |
| field | 取值字段 |  string | Y    | -      |
| defaultValue | 默认值 |  string | N    | -      |
| onChange | 值发生改变时触发 | `(newRecord: any, index: number, value?: any, field?: string) => {}`  | N    | -      |

#### DatePickerRender
| 属性         | 说明         | 类型          | 必须 | 默认值 |
| ------------ | ------------ | ------------- | ---- | ------ |
| field | 取值字段 |  string | Y    | -      |
| defaultValue | 默认值 |  string | N    | -      |
| onChange | 值发生改变时触发 | `(newRecord: any, index: number, value?: any, field?: string) => {}`  | N    | -      |
| getter | 取值转换函数（PS: 由于DatePikcer的值目前只支持moment对象，有需要可利用此函数进行转换） |  `value =>  { ... return newValue }`| Y    | -      |
| setter | 值更新时的转换函数 (PS: 考虑变化时传入的参数值是一个moment对象，与实际的数据值不符合，可借此进行转换）|  `value => {... return newValue }`| Y    | -      |