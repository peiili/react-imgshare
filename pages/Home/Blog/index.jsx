import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Button, Row, Col, Carousel, List, Image } from 'antd'
import moment from 'moment'
import Layout from '../Layouts'
import { carouselListServerSide } from '@/api/index'
import { getBlogList, getBlogListServerSide } from '@/api/articleApi'
import style from './index.module.css'
export async function getServerSideProps(context) {
    let img = []
    const res1 = await carouselListServerSide(1)
    if (res1.success) {
        img = res1.data
    }
    let contents = []
    let count = ''
    let totalPage = ''
    const res2 = await getBlogListServerSide({ fuzzy: '', page: '1', status: '1', size: '10', type: '2' })
    if (res2.success) {
        count = res2.data.count
        totalPage = res2.data.total
        contents = res2.data.list.map(e => {
            return Object.assign(e, {
                date: moment(e.created_date).format('YYYY-MM-DD')
            })
        })
    }

    return { props: { img, contents, count, totalPage } }
}
const ItemList = (props) => {
    const { contents, count, totalPage } = props
    const [list, setList] = useState(contents)
    const [pageObj, setPageObj] = useState({
        size: 10,
        page: 1,
    })
    const [query, setQuery] = useState({
        count: count,
        totalPage: totalPage,
        type: '2',
        fuzzy: '',
        status: '1',
    })
    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const getList = () => {
        const { fuzzy, status, type } = query
        const { page, size } = pageObj

        getBlogList({ fuzzy, page, status, size, type }).then(res => {
            if (res.success) {
                setQuery({
                    ...query,
                    count: res.data.count,
                    totalPage: res.data.total
                })
                const arr = res.data.list.map(e => {
                    return Object.assign(e, {
                        date: moment(e.created_date).format('YYYY-MM-DD')
                    })
                })
                setLoading(false)
                // console.log(pageObj.page>=res.data.total);
                if (pageObj.page >= res.data.total) {
                    setInitLoading(true)
                } else {
                    setInitLoading(false)
                }
                setList([...list, ...arr])
            }
        })
    }
    const onLoadMore = () => {
        const currentPage = pageObj.page + 1
        setPageObj({ ...pageObj, page: currentPage })
        getList()
        setLoading(true)
    }
    const loadMore = !initLoading ? (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button loading={loading} onClick={onLoadMore}>加载更多</Button>
        </div>
    ) : null;
    return (
        <div className={style.list}>
            <List
                header={<div><b>最新</b></div>}
                dataSource={list}
                split={true}
                loadMore={loadMore}
                loading={false}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<Link href={`/Home/Blog/Article?id=${item.id}`} style={{ cursor: 'pointer' }}>{item.title}</Link>}
                        />
                        <div>{item.date}</div>
                    </List.Item>

                )}
            >
            </List>
        </div>)
}
const Blog = (props) => {
    const { img, contents, count, totalPage } = props
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        setWindowWidth(window.screen.width)
    }, []);
    return (
        <Layout>
            <div className={style['blog-list']}>
                <Carousel autoplay={true}>
                    {img.map((item) => (
                        <div key={item.id}>
                            <Image
                                className={style.imgStyle}
                                width={'100%'}
                                alt={item.describe}
                                placeholder={
                                    <Image
                                        preview={false}
                                        src={'https://xek.dlsjf.top/' + item.name + '-123'}
                                        width={'100%'}
                                    />}
                                preview={false}
                                src={'https://xek.dlsjf.top/' + item.name}
                                fallback="data:image/png;base64,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"
                            />
                        </div>
                    ))}
                </Carousel>
                <div style={{ background: '#fff', paddingBottom: '15vh' }}>
                    <Row>
                        <Col span={windowWidth > 500 ? 12 : 22} offset={windowWidth > 500 ? 6 : 1}>
                            <ItemList contents={contents} count={count} totalPage={totalPage}></ItemList>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    )
}
export default Blog