import React from 'react'
import { Collapse as AntCollapse } from 'antd'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'

const Panel = AntCollapse.Panel
const StyledCollapse = styled(AntCollapse)`
  &.detail {
    margin-top: 30px;
    text-align: left;
  }
  .component-doc {
    table {
      width: 100%;
      th, tr, td {
        padding: 8px;
        border: 1px solid #eee;
        border-collapse: collapse;
      }
    }
    h2 {
      margin-top: 24px;
    }
    h3 {
      margin-top: 16px;
    }
    h4,h5 {
      margin-top: 8px;
    }
  }
` as any

interface ICollapse {
  apiMarkdown?: string,
  codeMarkdown?: string
  // 兼容历史文档：接口和代码合在一起的情况
  markdown?: string
}

const Collapse = (props: ICollapse) => {
  const { apiMarkdown, codeMarkdown, markdown } = props
  return (
    <StyledCollapse className="detail">
      {
        markdown && <Panel header="文档" key="doc">
          <ReactMarkdown className="component-doc" source={markdown} renderers={{ code: CodeBlock }} />
        </Panel>
      }
      {
        codeMarkdown && <Panel header="示例代码" key="code">
          <ReactMarkdown className="component-doc" source={codeMarkdown} renderers={{ code: CodeBlock }} />
        </Panel>
      }
      {
        apiMarkdown && <Panel header="接口文档" key="api">
          <ReactMarkdown className="component-doc" source={apiMarkdown} />
        </Panel>
      }
    </StyledCollapse>
  )
}

export default Collapse;
