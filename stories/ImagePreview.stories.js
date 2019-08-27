import { storiesOf } from '@storybook/react'
import React from 'react'
import { ImagePreview } from '../components'
import Summary from '../story-utils/Summary';
import api from '../docs/ImagePreview/api.md';
import doc1 from '../docs/ImagePreview/demo1.md';
import doc2 from '../docs/ImagePreview/demo2.md';
import doc3 from '../docs/ImagePreview/demo3.md';
import doc4 from '../docs/ImagePreview/demo4.md';
import Collapse from '../story-utils/Collapse';

storiesOf('ImagePreview-图片预览', module)
  .add('默认状态', () => (
    <>
      <Summary name="ImagePreview" /> 
      <ImagePreview
        url={'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg'}
        previewUrl={
          'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg'
        }
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc1} />
    </>
  ))
  .add('指定缩略图尺寸', () => (
    <>
      <Summary name="ImagePreview" /> 
      <ImagePreview
        url={'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg'}
        width={200}
        height={200}
        previewUrl={
          'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg'
        }
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc2} />
    </>
  ))
  .add('指定预览图尺寸', () => (
    <>
      <Summary name="ImagePreview" /> 
      <ImagePreview
        url={'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg'}
        previewWidth={500}
        previewHeight={500}
        previewUrl={
          'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg'
        }
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc3} />
    </>
  ))
  .add('多张图显示', () => (
    <>
      <Summary name="ImagePreview" /> 
      <ImagePreview
        url={
          'http://n.sinaimg.cn/sports/transform/0/w500h300/20190211/bO-K-hswimzx8729534.jpg'
        }
        width={50}
        height={50}
        previewWidth={500}
        previewHeight={500}
        previewUrl={
          'http://n.sinaimg.cn/sports/transform/0/w500h300/20190211/bO-K-hswimzx8729534.jpg'
        }
      />
      <br />
      <ImagePreview
        url={'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg'}
        width={50}
        height={50}
        previewWidth={500}
        previewHeight={500}
        previewUrl={
          'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg'
        }
      />
      <Collapse apiMarkdown={api} codeMarkdown={doc4} />
    </>
  ))
