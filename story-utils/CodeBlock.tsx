
import React from 'react'

const hljs = require('highlight.js/lib/highlight')
const javascript = require('highlight.js/lib/languages/javascript')
hljs.registerLanguage('javascript', javascript)
require('highlight.js/styles/atom-one-dark.css')


class CodeBlock extends React.PureComponent<any, any> {
  private codeEl: any
  constructor(props: any) {
    super(props)
    this.setRef = this.setRef.bind(this)
    this.codeEl = React.createRef()
  }

  setRef(el: any) {
    this.codeEl = el
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}

export default CodeBlock
