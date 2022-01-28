import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Divider, PageHeader, Spin, Carousel, Col, Row } from 'antd'
import { marked } from 'marked'
import { getBlogContent } from '@/api/articleApi'
import { carouselList } from '@/api/index'
import style from './index.module.css'
import Layout from './../../Layouts'
const { Text } = Typography;
const Article = () => {
    const router = useRouter()
    const [poolData, setPoolData] = useState([])
    const [windowWidth, setWindowWidth] = useState(0);
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        content: ''
    })
    useEffect(() => {
        carouselList(1).then((res) => {
            setPoolData(res.data)
        })
        if (router.query.id) {
            getBlogContent(router.query.id).then(res => {
                if (res.success) {
                    const { title, description, content } = res.data[0]
                    marked.setOptions({
                        gfm: true,
                        tables: true,
                        breaks: true,
                        pedantic: false,
                        sanitize: true,
                        smartLists: true,
                        smartypants: false,
                        langPrefix: false,
                        highlight: function (code, lang) {
                            const hljs = require('highlight.js');
                            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                            return hljs.highlight(code, { language }).value;
                        }
                    });
                    setInitialValues({
                        title,
                        description,
                        content: marked.parse(content),
                    })
                }
            })
        }
        setWindowWidth(window.screen.width)
    }, [router.query.id])
    return (
        <>
            <Layout>
                <div className={style['blog-list']}>
                    <Carousel autoplay={true}>
                        {poolData.map((item) => (
                            <div key={item.id}>
                                <img
                                    className={style.imgStyle}
                                    alt={item.describe}
                                    src={'https://www.dlsjf.top/' + item.name}
                                ></img>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <Row>
                    <Col span={windowWidth > 500 ? 12 : 24} offset={windowWidth > 500 ? 6 : 0}>
                        {initialValues.content ? (
                            <div>
                                <PageHeader
                                    className={style['site-page-header']}
                                    onBack={() => router.back()}
                                    title={initialValues.title}
                                />
                                <div style={{ margin: '20px' }}>
                                    {
                                        initialValues.description &&
                                        <Text type="secondary">{initialValues.description}</Text>
                                    }
                                    <Divider plain></Divider>
                                    <div dangerouslySetInnerHTML={{ __html: initialValues.content }}></div>
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