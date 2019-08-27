### 接口描述 - FormFactory
| 属性            | 说明           | 类型            | 必须 | 默认值 |
| --------------- | -------------- | --------------- | ---- | ------ |
| config | 表单数据配置  | Array<IFormItem> | Y    | -      |
| form |  [antd 表单套件](https://ant.design/components/form-cn/)           | object          | Y    | -    |
| formItemLayout |  [antd 表单布局](https://ant.design/components/grid/#Col)           | object          | N    | -    |

### IFormItem
| 属性     | 说明     | 类型                | 必须 | 默认值 |
| -------- | -------- | ------------------- | ---- | ------ |
| type | 表单项类型 | FormTypes | Y    | -      |
| key      | 表单对应id | string              | Y    | -      |
| label | 表单文案标识   | string     | N    | -      |
| placeholder | 提示   | string     | N    | -      |
| options | 子选择项值   | IOption | N    | -      |
| initialValue | 初始化值   | string | N    | -      |
| combo | 当一行有多个表单的配置项   | Array<IFormItem> | N    | -      |
| onChange | 表单值发生变化事件触发 | Function(event) | N    | -      |
| disabled | 表单禁止 | boolean | N    | -      |
| rules | [同antd规则](https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99) | Array<object> | N    | -      |
| formProps | 更具体的表单项配置，参考antd不同表单类型参数 | Object | N    | -      |
| render | 当表类型为自定义时，自定义渲染函数 | () => JSX.Element | N    | -      |
| formItemLayout |  [antd 表单布局](https://ant.design/components/grid/#Col)           | object          | N    | -    |

### IOption
| 属性     | 说明     | 类型                | 必须 | 默认值 |
| -------- | -------- | ------------------- | ---- | ------ |
| value | 值 | any | Y    | -      |
| label | 文案 | string | Y    | -      |


