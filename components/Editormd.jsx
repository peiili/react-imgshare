import React, { Component } from "react";
import PropTypes from 'prop-types';
import Script from 'next/script'
import Head from 'next/head'
import { Button } from 'antd'

class Editormd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      EditormdView: null,
      marked: props.marked || '',
      submit: props.submit
    }
    this.getHTML = this.getHTML.bind(this)
  }

  componentDidMount() {
    this.setState({
      EditormdView: window.editormd("editormd-view", {
        width: "100%",
        height: 720,
        toc: true,
        imageUpload: true,          // Enable/disable upload
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        saveHTMLToTextarea: true,
        todoList: true,
        emoji: false,
        path: '/static/js/'
      })
    })
  }
  getHTML() {
    // console.log(this.state);
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
        < Script
          strategy="beforeInteractive"
          src="/static/js/jquery.min.js"
        />
        {/* < Script
          strategy="beforeInteractive"
          src="/static/js/jquery.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/flowchart.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/jquery.flowchart.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/marked.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/raphael.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/underscore.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/sequence-diagram.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/prettify.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/zepto.min.js"
        />
        <Script
          strategy="beforeInteractive"
          src="/static/js/editormd.min.js"
        /> */}
        <div>
          <div id="editormd-view" >
            <textarea
              id="append-test2"
              style={{ display: 'none' }}
              defaultValue={this.state.marked} />
          </div>
          <Button onClick={() => this.getHTML()}> 获取html </Button>
        </div>
      </>
    )
  }
}
Editormd.propTypes = {
  marked: PropTypes.string
};
export default Editormd;
