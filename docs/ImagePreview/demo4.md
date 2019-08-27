```javascript
import { ImagePreview } from 'business-ui'


() => (
  <>
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
  </>
)
```