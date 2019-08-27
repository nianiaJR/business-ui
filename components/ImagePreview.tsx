import React, { Component } from 'react'
import Modal from './Modal'
import styled from 'styled-components'

interface IImagePreivewProps {
  /**
   * 缩略图片地址
   */
  url: string
  /**
   * 预览图片地址
   */
  previewUrl: string
  /**
   * 缩略图宽度
   * @default 80
   */
  width?: number
  /**
   * 缩略图高度
   * @default 80
   */
  height?: number
  /**
   * 预览图宽度
   * @default 400
   */
  previewWidth?: number
  /**
   * 预览图高度
   * @default 300
   */
  previewHeight?: number
}

const StyledImage = styled.div`
  display: flex;
  width: auto;
  cursor: pointer;
`

const StyledModal = styled((props: any) => <Modal {...props} />)`
  display: flex;
  .ant-modal-body {
    padding: 0px;
  }
`

class ImagePreview extends Component<IImagePreivewProps, any> {
  handler: any

  handleClick = () => {
    if (this.handler) {
      this.handler.show()
    }
  }

  render() {
    const {
      width = 80,
      height = 80,
      previewWidth = 400,
      previewHeight = 300,
      url,
      previewUrl
    } = this.props
    return (
      <StyledImage
        style={{
          width,
          height
        }}
      >
        <img src={url} width="100%" height="100%" onClick={this.handleClick} />
        <StyledModal
          modalRef={(ref: any) => (this.handler = ref)}
          footer={null}
        >
          <img src={previewUrl} width={previewWidth} height={previewHeight} />
        </StyledModal>
      </StyledImage>
    )
  }
}

export default ImagePreview
