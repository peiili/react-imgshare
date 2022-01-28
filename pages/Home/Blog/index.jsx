import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Button, Row, Col, Carousel, List } from 'antd'
import moment from 'moment'
import Layout from '../Layouts'
import { carouselList } from '@/api/index'
import { getBlogList } from '@/api/articleApi'
import Article from './Article/index'
import style from './index.module.css'
const ItemList = (props) => {
    const router = useRouter()
    const [list, setList] = useState([])
    const [pageObj, setPageObj] = useState({
        size: 10,
        page: 1,
    })
    const [query, setQuery] = useState({
        count: 0,
        totalPage: 0,
        type: '2',
        fuzzy: '',
        status: '1',
    })
    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const getList = () => {
        const {fuzzy,status,type} = query
        const {page,size} = pageObj
        
        getBlogList({fuzzy,page,status,size,type}).then(res => {
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
                if(pageObj.page>=res.data.total){
                    setInitLoading(true)
                }else{
                    setInitLoading(false)
                }
                setList([...list, ...arr])
            }
        })
    }
    useEffect(() => {
        getList()
    }, [])
    useEffect(() => {
        getList()
    }, [pageObj])
    const onLoadMore = () => {
        const currentPage = pageObj.page+1
        setPageObj({...pageObj,page:currentPage})
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
                renderItem={item => <List.Item onClick={() => {
                    router.push(`/Home/Blog/Article?id=${item.id}`)
                }
                }>
                    <List.Item.Meta
                        title={<span style={{ cursor: 'pointer' }}>{item.title}</span>}
                    />
                    <div>{item.date}</div>
                </List.Item>
                }
            >
            </List>
        </div>)
}
const Blog = (props) => {
    const [poolData, setPoolData] = useState([])
    const [windowWidth,setWindowWidth] = useState(0);
    useEffect(() => {
        carouselList(1).then((res) => {
            setPoolData(res.data)
        })
        setWindowWidth(window.screen.width)
    }, []);
    return (
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
            <div style={{ background: '#fff', paddingBottom: '15vh' }}>
                <Row>
                    <Col span={windowWidth > 500 ? 12 : 24} offset={windowWidth > 500 ? 6 : 0}>
                    <ItemList></ItemList>
                    {/* <Link href={}>
                    </Link> */}
                        {/* <Router>
                            <Switch>
                                <Route exact path={`${match.url}`} component={ItemList}></Route>
                                <Route path={`${match.url}/article`} component={Article}></Route>
                            </Switch>
                        </Router> */}
                    </Col>
                </Row>
            </div>
        </div>
        </Layout>
    )
}
export default Blog