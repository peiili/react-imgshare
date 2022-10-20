import React, { Component } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head'

let num = -1
class Editormd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      EditormdView: null,
      marked: '',
      submit: props.submit,
      viewonly: props.viewonly
    }
    this.getHTML = this.getHTML.bind(this)
  }
  componentWillReceiveProps(newProps) {
    // 参数为给组件传递的参数
    this.setState({
      marked: newProps.value || '',
    })
  }
  componentDidMount() {
    num = setInterval(() => {
      if (window.editormd) {
        clearInterval(num)
        this.setState({
          EditormdView: this.state.viewonly ? window.editormd.markdownToHTML("editormd-view", {
            htmlDecode: "style,script,iframe",  // you can filter tags decode
            emoji: true,
            taskList: true,
            fontSize: "16px",
            tex: true,  // 默认不解析
            flowChart: true,  // 默认不解析
            sequenceDiagram: true,  // 默认不解析
          }) : window.editormd("editormd-view", {
            width: "100%",
            height: 720,
            toc: true,

            markdown: this.state.marked,
            imageUpload: true,      // Enable/disable upload
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            saveHTMLToTextarea: true,
            todoList: true,
            emoji: false,
            path: '/static/js/',
            onchange: () => {
              this.getHTML()
            },
          })
        })
      }
    }, 500);
  }
  componentWillUnmount() {
    if (num) {
      clearInterval(num)
    }
  }
  getHTML() {
    this.setState({
      marked: this.state.EditormdView.getMarkdown(),
      content: this.state.EditormdView.getHTML()
    })
    const _marked = this.state.EditormdView.getMarkdown()
    const _html = this.state.EditormdView.getHTML()
    this.state.submit({ _html, _marked })
  }

  render() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/css/style.css" />
          <link rel="stylesheet" href="/static/css/editormd.logo.min.css" />
          <link rel="stylesheet" href="/static/css/editormd.min.css" />
          <link rel="stylesheet" href="/static/css/editormd.preview.min.css" />
          <script src="/static/js/jquery.min.js"></script>
          <script src="/static/js/flowchart.min.js"></script>
          <script src="/static/js/jquery.flowchart.min.js"></script>
          <script src="/static/js/marked.min.js"></script>
          <script src="/static/js/raphael.min.js" />
          <script src="/static/js/underscore.min.js" />
          <script src="/static/js/sequence-diagram.min.js" />
          <script src="/static/js/prettify.min.js" />
          <script src="/static/js/zepto.min.js" />
          <script src="/static/js/editormd.min.js" />
        </Head>
        <div>
          <div id="editormd-view" style={{ fontSize: '16px' }} >
            <textarea
              id="append-test2"
              style={{ display: 'none', fontSize: '16px' }}
              defaultValue={this.state.marked}
            />

          </div>
        </div>
      </>
    )
  }
}
Editormd.propTypes = {
  marked: PropTypes.string,
  onlyView: PropTypes.bool
};
export default Editormd;
