import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { withInfo } from '@storybook/addon-info'
import { withTests } from '@storybook/addon-jest'
import styled from 'styled-components'
// import results from '../.jest-test-results.json'

// info插件相关配置项
addDecorator(
  withInfo({
    header: false,
    inline: true
  })
)

// Jest测试相关配置
// addDecorator(withTests({
//   results,
//   filesExt: '(\\.test)(\\.jsx)$',
// }))

// story相关插件
addParameters({
  options: {
    name: ' business-ui',
    showAddonPanel: false
  },
  info: {
    source: false,
    propTables: null
  }
})

// 添加全局演示环境样式
const StyledDemo = styled.div`
  background: #fff;
  padding: 30px;
  h3 + table {
    width: 100%;
    th,
    tr,
    td {
      padding: 8px;
      border: 1px solid #eee;
      border-collapse: collapse;
    }
  }
`
const ComponentDecorator = storyFn => (
  <StyledDemo>
    <LocaleProvider locale={zhCN}>{storyFn()}</LocaleProvider>
  </StyledDemo>
)
addDecorator(ComponentDecorator)

// automatically import all files ending in *.stories.js
const req1 = require.context('../stories', true, /.doc.js$/)
const req2 = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  req1.keys().forEach(filename => req1(filename))
  req2.keys().forEach(filename => req2(filename))
}

configure(loadStories, module)
