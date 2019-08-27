import React from 'react'
import { Alert } from 'antd'
import { AlertProps } from 'antd/lib/alert'
import styled from 'styled-components'
import intl from 'react-intl-universal'

import { enUS, zhCN } from './config/locales'
import IntlLocales from './IntlLocales'

const locales = {
  [IntlLocales.enUS]: enUS,
  [IntlLocales.zhCN]: zhCN
}

type clearFunc = () => void

interface ISelectTipProps {
  num: number
  totalNum?: number
  template?: any
  enableClear?: boolean
  clearSelection?: clearFunc
  currentLocale?: IntlLocales
}

const genContent = (template: any, num: number, totalNum: number) => {
  if (typeof template !== 'object') {
    return String(template)
      .replace('$$num', String(num))
      .replace('$$totalNum', String(totalNum))
  } else {
    let newChildren: any = []
    if (typeof template.props.children === 'object') {
      newChildren = template.props.children.map((child: any) => {
        return genContent(child, num, totalNum)
      })
    } else {
      newChildren = genContent(template.props.children, num, totalNum)
    }
    const newElement = React.cloneElement(
      template,
      { ...template.props, key: `search-tip-child-${Math.random()}` },
      newChildren
    )
    return newElement
  }
}

const StyledAlert = styled((props: AlertProps) => <Alert {...props} />)`
  height: 36px;
  padding: 8px 16px 7px 16px;
  border-radius: 3px;
  border: 1px solid rgba(186, 231, 255, 1);
  background-color: #e6f7ff;
  display: inline-flex;
  justify-content: flex-start;

  .num {
    color: #1890ff;
  }

  .action {
    color: #1890ff;
    margin-left: 15px;
    cursor: pointer;
  }
`

const SelectTip = (props: ISelectTipProps) => {
  const { currentLocale = IntlLocales.zhCN } = props
  intl.init({
    locales: {},
    // 避免与已有的语言包冲突
    ...intl.getInitOptions(),
    currentLocale
  })
  // 这里采用load的方式加载使得locales以合并的方式加载，以避免与外部的语言包冲突
  intl.load(locales)
  const { num, totalNum } = props
  const template = props.template
    ? props.template
    : `${intl.get('business.searchTip.description', {
        number: '$$num',
        totalNum: '$$totalNum'
      })} `

  const content = genContent(template, num, totalNum)

  return (
    <StyledAlert
      className="business-select-tip"
      message={
        <div>
          {content}
          {props.enableClear ? (
            <span className="action" onClick={props.clearSelection}>
              {intl.get('business.searchTip.clear')}
            </span>
          ) : (
            ''
          )}
        </div>
      }
      type="info"
      showIcon={true}
    />
  )
}

export default SelectTip;