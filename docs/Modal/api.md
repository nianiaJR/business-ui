## 接口描述 - Modal
| 属性            | 说明           | 类型            | 必须 | 默认值 |
| --------------- | -------------- | --------------- | ---- | ------ |
| modalRef | 初始化modal时，返回modal控制对象的回调函数 | (ref:IModalRef) => void | N   | -      |
| 其他props | 支持antd Modal的[api](https://ant.design/components/modal-cn/#API)| AntdModalProps | N | - |

注意: Modal相当于antd的Modal的高阶组件，内置了显示控制逻辑，同样支持antd Modal的[props配置](https://ant.design/components/modal-cn/#API)

### IModalRef
| 属性            | 说明           | 类型            | 必须 | 默认值 |
| --------------- | -------------- | --------------- | ---- | ------ |
| show | 展现modal控制函数 | Function(callback) | Y   | -      |
| hide | 隐藏modal控制函数 | Function(callback) | Y   | -      |
