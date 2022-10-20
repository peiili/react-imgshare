import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { Typography, Divider, PageHeader, Spin, Col, Row } from 'antd'
import Editormd from '@/components/Editormd'
import { getBlogContentServerSide, putViewServerSide } from '@/api/articleApi'
import style from './index.module.css'
import Layout from '../../Layouts'
const { Text } = Typography;

export async function getServerSideProps(context) {

  const res2 = await getBlogContentServerSide(context.query.id)
  let contents = {}
  if (res2.success) {
    const { title, description, marked, content, keywords } = res2.data[0]
    contents = {
      title,
      description,
      keywords,
      marked,
      content,
    }
  }
  // 更新浏览量
  putViewServerSide(context.query.id)
  return { props: { contents } }
}
const Article = (props) => {
  const { contents } = props
  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(200);
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    setContentHeight(window.innerHeight - 145)
  }, [router.query.id])
  return (
    <>
      <Layout active='/Home/Blog'>
        <div className={style['blog-list']}>
        </div>
        <Row>
          {windowWidth}
          <Col span={windowWidth > 1920 ? 12 : 22} offset={windowWidth > 1922 ? 6 : 1}>
            {contents.content ? (
              <div style={{ minHeight: contentHeight + 'px' }}>
                <Head>
                  <title>{contents.title}</title>
                  <meta name="keywords" content={contents.keywords} />
                  <meta name="description" content={contents.description} />
                </Head>
                <PageHeader
                  className={style['site-page-header']}
                  onBack={() => router.back()}
                  title={contents.title}
                />
                <div style={{ margin: '20px' }}>
                  {
                    contents.description &&
                    <Text type="secondary">{contents.description}</Text>
                  }
                  <Divider plain></Divider>
                  <Editormd value={contents.marked} viewonly={true}></Editormd>
                </div>
              </div>
            ) : (<div>
              <div className={style.example}>
                <Spin />
              </div>
            </div>)
            }
          </Col>
        </Row>
      </Layout>
    </>
  )
};
export default Article;
