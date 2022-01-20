import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Button, Row, Col, Carousel, List } from 'antd'
import moment from 'moment'
import { carouselList } from '@/api/index.js'
import { getBlogList } from '@/api/articleApi'
import Article from './Article/index'
import './index.css'
const ItemList = (props) => {
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
        <div className='list'>
            <List
                header={<div><b>最新</b></div>}
                dataSource={list}
                split={true}
                loadMore={loadMore}
                loading={false}
                renderItem={item => <List.Item onClick={() => {
                    props.history.push({ pathname: `/Home/Blog/article`, search: `id=${item.id}` })
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
    const { match } = props
    const [poolData, setPoolData] = useState([])
    useEffect(() => {
        carouselList(1).then((res) => {
            setPoolData(res.data)
        })
    }, []);
    return (
        <div className='blog-list'>
            <Carousel autoplay={true}>
                {poolData.map((item) => (
                    <div key={item.id}>
                        <img
                            className="imgStyle"
                            alt={item.describe}
                            src={'https://www.dlsjf.top/' + item.name}
                        ></img>
                    </div>
                ))}
            </Carousel>
            <div style={{ background: '#fff', paddingBottom: '15vh' }}>
                <Row>
                    <Col span={window.screen.width > 500 ? 12 : 24} offset={window.screen.width > 500 ? 6 : 0}>
                        <Router>
                            <Switch>
                                <Route exact path={`${match.url}`} component={ItemList}></Route>
                                <Route path={`${match.url}/article`} component={Article}></Route>
                            </Switch>
                        </Router>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default Blog