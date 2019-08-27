import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Button } from 'antd'
import { Tag } from '../components'
import Summary from '../story-utils/Summary';
import api from "../docs/Tag/api.md";
import doc1 from "../docs/Tag/demo1.md";
import doc2 from "../docs/Tag/demo2.md";
import doc3 from "../docs/Tag/demo3.md";
import doc4 from "../docs/Tag/demo4.md";
import doc5 from "../docs/Tag/demo5.md";
import Collapse from '../story-utils/Collapse';


const handleChange = (value) => {
  alert(`当期tags值改变为：${JSON.stringify(value)}`)
}

const DemoForm = Form.create()((props) => {
  const handleSubmit = () => {
    const tags = props.form.getFieldValue('tags')
    alert(`提交表单值-tags: ${tags}`)
  }

  const { getFieldDecorator } = props.form

  return (
    <Form>
      <Form.Item>
        {
          getFieldDecorator('tags', {
            initialValue: ['aaa'],
          })(<Tag />)
        }
      </Form.Item>
      <Form.Item>
        <Button onClick={handleSubmit}>提交</Button>
      </Form.Item>
    </Form>
  )
})


storiesOf('表单.Tag-标签')
  .add('demo1 - 默认形态', () =>
    <>
      <Summary name="Tag" />
      <Tag onChange={handleChange} />
      <Collapse apiMarkdown={api} codeMarkdown={doc1} />
    </>
  )
  .add('demo2 - 添加默认值', () =>
    <>
      <Summary name="Tag" />
      <Tag onChange={handleChange} defaultValue={['123', '33']} />
      <Collapse apiMarkdown={api} codeMarkdown={doc2} />
    </>
  )
  .add('demo3 - 支持修改文案', () =>
    <>
      <Summary name="Tag" />
      <Tag onChange={handleChange} addText="+ Tag" />
      <Collapse apiMarkdown={api} codeMarkdown={doc3} />
    </>
  )
  .add('demo4 - 配合antd的form使用', () =>
    <>
      <Summary name="Tag" />
      <DemoForm />
      <Collapse apiMarkdown={api} codeMarkdown={doc4} />
    </>
  )
  .add('demo5 - 禁止状态', () =>
    <>
      <Summary name="Tag" />
      <Tag onChange={handleChange} addText="+ 标签" disabled />
      <Collapse apiMarkdown={api} codeMarkdown={doc5} />
    </>
  )