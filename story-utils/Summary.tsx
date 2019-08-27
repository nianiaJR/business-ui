import React from 'react'
import styled from 'styled-components'
import { Alert } from 'antd'

import {
  BASIC_COMPONENT_COST,
  LABEL_COMPONENT_COST,
  RETAIL_COMPONENT_COST,
  SECURITY_COMPONENT_COST
} from './constants'

interface ISummaryProps {
  name: string
  // 测试成本（人/天）
  testCost: number
  // 开发成本
  developCost: number,
  // 组件业务分类
  type?: string
}

const StyledSummary = styled(Alert)`
  &.ant-alert {
    margin-bottom: 16px;
  }

  .summary-content {
    display: flex;
    width: 100%;

    h3 {
      margin: 0;
    }

    .cost {
      flex: 1;
      text-align: right;
      span + span {
        margin-left: 32px;
      }
    }
  }
`

const Summary = (props: ISummaryProps) => {
  const { name, type = 'basic' } = props
  let whichCost = { develop: 0, test: 0 }
  switch (type) {
    case 'basic':
      whichCost = BASIC_COMPONENT_COST[name]
      break;
    case 'label': // 标注平台
      whichCost = LABEL_COMPONENT_COST[name]
      break;
    case 'retail':
      whichCost = RETAIL_COMPONENT_COST[name]
      break;
    case 'security':
      whichCost = SECURITY_COMPONENT_COST[name]
      break;
  }

  const { develop=0, test=0 } = whichCost

  return <StyledSummary
    message={<div className="summary-content">
      <h3>{name}</h3>
    </div>}
  />
}

export default Summary
