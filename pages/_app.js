import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import "antd/dist/antd.css";
export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>三味书屋</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <meta name="keywords" content="壁纸,博客,前端,照片排版,bing壁纸,bing,网站搭建,博客搭建,个人博客" />
                <meta name="description" content="分享bing优秀的壁纸，让用户不再因找不到好看的壁纸而烦恼,同时会分享一些自己的生活，开发一些排版小工具，分享一些好的博客" />
            </Head>
            <Script
                src="https://hm.baidu.com/hm.js?e6a4a66be15383cdb75c16f0da432f3b"
            />
            <Component {...pageProps} />
        </>
    )
}