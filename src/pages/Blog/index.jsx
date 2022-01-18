import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Button,Row, Col, Carousel, List } from 'antd'
import moment from 'moment'
import { carouselList } from '@/api/index.js'
import { getBlogList } from '@/api/articleApi'
import Article from './Article/index'
import './index.css'
const ItemList = (props) => {
    const [list,setList] = useState([])
    const [initLoading,setInitLoading] = useState(true)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        const params = {
            type: '2',
            fuzzy: '',
            page: 1,
            size: 10,
        }
        getBlogList(params).then(res => {
            if (res.success) {
                setList( res.data.map(e=>{
                    return Object.assign(e,{
                        date:moment(e.created_date).format('YYYY-MM-DD')
                    })
                }))
            }
        })
    },[])
    // const data = [
    //     { id: '1', title: 'Racing car sprays burning fuel into crowd.', date: '2022-01-11' }
    // ];
    const onLoadMore = ()=>{

    }
    const loadMore = !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>加载更多</Button>
      </div>
    ) : null;
    return (
        <div className='list'>
            <List
                header={<div><b>最新</b></div>}
                dataSource={list}
                split={true}
                loadMore={loadMore}
                renderItem={item => <List.Item onClick={() => {
                    props.history.push({ pathname: `/Home/Blog/article`, search: `id=${item.id}` })
                }
                }>
                    <List.Item.Meta
                        title={<span style={{cursor: 'pointer'}}>{item.title}</span>}
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
            <div style={{background:'#fff',paddingBottom:'15vh'}}>
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