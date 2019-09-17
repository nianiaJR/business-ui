import { storiesOf } from '@storybook/react'
import React from 'react'
import { Button } from 'antd'
import { Modal } from '../components'

import doc1 from '../docs/Modal/demo1.md'
import api from '../docs/Modal/api.md'
import Collapse from '../story-utils/Collapse';

storiesOf('Modal-弹窗', module)
  .addParameters({
    info: {
      source: false,
      propTables: null
    }
  })
  .add('demo1', () => {
    let updateModalHandler = null
    const handleInitModal = ref => {
        updateModalHandler = ref
        updateModalHandler.show()
    }
    const handleOk = () => {
      console.log('do ok things here')
      updateModalHandler.hide()
    }
    const handleCancel = () => {
      console.log('do cancel things here')
      updateModalHandler.hide()
    }
    return <>
      <Modal modalRef={handleInitModal} footer={null}>
        <div>
          this is modal content
        </div>
        <div>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={handleOk}>Ok</Button>
        </div>
      </Modal>
      <Collapse apiMarkdown={api} codeMarkdown={doc1} />
    </>
  })