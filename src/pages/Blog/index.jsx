import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch ,Link} from 'react-router-dom'
import { Row, Col, Carousel, Divider, List } from 'antd'
import { carouselList } from '@/api/index.js'
import Article from './Article/index'
import './index.css'
const ItemList = (props) => {
    const data = [
        { id:'1',title: 'Racing car sprays burning fuel into crowd.', date: '2022-01-11' },
        { id:'2',title: 'Japanese princess to wed commoner.', date: '2022-01-11' },
        { id:'3',title: 'Australian walks 100km after outback crash.', date: '2022-01-11' },
        { id:'4',title: 'Man charged over missing wedding girl.', date: '2022-01-11' },
        { id:'5',title: 'Los Angeles battles huge wildfires.', date: '2022-01-11' },
    ];
    return (
        <div className='list'>
            <List
                header={<div><b>最新</b></div>}
                dataSource={data}
                split={true}
                renderItem={item => <List.Item>
                    <List.Item.Meta
                        title={<span onClick={()=>{
                            props.history.push({ pathname:`/Home/Blog/article`, search:`id=${item.id}`})     
                        }
                        }>{item.title}</span>}
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
        </div >
    )
}
export default Blog