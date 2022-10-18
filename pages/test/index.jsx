import React, { useEffect } from "react";
import Script from 'next/script'
import Head from 'next/head'
const Editmd = () => {
  useEffect(() => {
    setTimeout(() => {
      window.editormd("test-editormd-view2", {
        width: "90%",
        height: 720,
        toc: true,
        //atLink    : false,    // disable @link
        //emailLink : false,    // disable email address auto link
        todoList: true,
        path: '/static/js/'
      });

    }, 2000)
  }, [])
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/css/style.css" />
      </Head>
      <Script
        src="/static/js/jquery.min.js"
      />
      <Script
        src="/static/js/flowchart.min.js"
      />
      <Script
        src="/static/js/jquery.flowchart.min.js"
      />
      <Script
        src="/static/js/marked.min.js"
      />
      <Script
        src="/static/js/prettify.min.js"
      />
      <Script
        src="/static/js/zepto.min.js"
      />
      <Script
        src="/static/js/editormd.min.js"
      />
      <div>
        <div id="test-editormd-view2">
          <textarea id="append-test" style={{ display: 'none' }}>###科学公式 TeX(KaTeX)</textarea>
        </div>
      </div>
    </>
  )
}
export default Editmd;
