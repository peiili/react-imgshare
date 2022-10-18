import React, { Component } from "react";
import Script from 'next/script'
import Head from 'next/head'

class Editmd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      selectValue: '选项3',
      react: false,
      redux: false,
      mobx: false,
    }
  }

  componentDidMount() {
    window.editormd("test-editormd-view2", {
      width: "90%",
      height: 720,
      toc: true,
      //atLink    : false,    // disable @link
      //emailLink : false,    // disable email address auto link
      todoList: true,
      path: '/static/js/'
    });
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
        </div>
      </>
    )
  }

}

export default Editmd;
