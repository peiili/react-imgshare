import React, { Component } from "react";
import Script from 'next/script'
import Head from 'next/head'
import { Button } from 'antd'

class Editmd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testEditormdView1: null
    }
    this.getHTML = this.getHTML.bind(this)
  }

  componentDidMount() {
    this.setState({
      testEditormdView1: window.editormd("test-editormd-view2", {
        width: "90%",
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
    console.log(this.state.testEditormdView1.getMarkdown());
    console.log(this.state.testEditormdView1.getHTML());
  }

  render() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/css/style.css" />
          <link rel="stylesheet" href="/static/css/editormd.logo.min.css" />
          <link rel="stylesheet" href="/static/css/editormd.min.css" />
          <link rel="stylesheet" href="/static/css/editormd.preview.min.css" />
        </Head>
        <Script
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
        />
        <div>
          <div id="test-editormd-view2">
            <textarea id="append-test" style={{ display: 'none' }} defaultValue={'###科学公式 TeX(KaTeX)'}></textarea>
          </div>
          <Button onClick={() => this.getHTML()}>获取html</Button>
        </div>
      </>
    )
  }

}

export default Editmd;
