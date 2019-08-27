import React, { useState } from 'react'
import styled from 'styled-components'
import objectGet from 'lodash/get'

export interface IRenderProps {
  /**
   * 图片url所要读取的字段
   */
  imageField: string,
  /**
   * 文本内容所要读取的字段
   */
  textField: string,
  /**
   * 加载错误图片url
   */
  errorUrl?: string,
  /**
   * 默认图片url
   */
  defaultImage?: string,
  /**
   * 默认文案
   */
  defaultText?: string,
  /**
   * 点击文案后触发的操作函数
   */
  onView?: (record: any) => void
}

interface IImageProps extends IRenderProps  {
  data: any
}

const noop = () => {}

const StyledImageText = styled.div`
  img {
    height: 45px;
    width: 80px;
    margin-right: 10px;
  }
`

const ImageText = (props: IImageProps) => {
  const { imageField, errorUrl, textField, onView=noop, data={}, defaultImage='', defaultText='' } = props
  const [isError, setIsError] = useState(false)
  const imageUrl = objectGet(data, imageField, defaultImage)
  const text = objectGet(data, textField, defaultText)

  return <StyledImageText className="image-render">
    <img
      className={isError ? 'error-image' : 'normal-image'}
      src={isError ? errorUrl : imageUrl}
      alt="图片丢失"
      onError={() => setIsError(true)}
    />
    <a href="" onClick={e => {
      e.preventDefault()
      onView(data)
    }}>
      {text}
    </a>
  </StyledImageText>
}

const ImageTextRender = (props: IRenderProps) => (_: string, record: any, index: any) => {
  return <ImageText data={record} {...props}  />
}

export default ImageTextRender;
