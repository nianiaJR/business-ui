import React, { Component } from 'react'
import { Modal as AntModal } from 'antd'
import { ModalProps } from 'antd/lib/modal'

interface IModalState {
  visible: boolean
}

interface IModalRef {
  show: (callback?: any) => void
  hide: (callback?: any) => void
}

interface IModalProps extends ModalProps {
  /**
   * 当初始化modal时，返回modal控制对象的回调函数
   * ref => ({ visible, show, hide })
   */
  modalRef?: (ref: IModalRef) => void
  children?: any
}
export default class Modal extends Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props)
    this.state = {
      visible: false
    }
  }
  componentDidMount() {
    if (this.props.modalRef) {
      this.props.modalRef({
        show: this.show,
        hide: this.hide
      })
    }
  }

  show = (callback?: any) => {
    this.setState(
      {
        visible: true
      },
      () => {
        if (callback) {
          callback()
        }
      }
    )
  }

  hide = (callback?: any) => {
    this.setState(
      {
        visible: false
      },
      () => {
        if (callback) {
          callback()
        }
      }
    )
  }

  render() {
    return (
      this.state.visible && (
        <AntModal
          visible
          onCancel={() => {
            this.hide()
          }}
          {...this.props}
        >
          {this.props.children}
        </AntModal>
      )
    )
  }
}
