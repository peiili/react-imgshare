import React, { useState, useEffect } from 'react';
import { Row, Col, Carousel, Button, List } from 'antd'
import { carouselList } from '@/api/index.js'
import './index.css'
const Blog = () => {
    const [poolData, setPoolData] = useState([])
    useEffect(() => {
        carouselList(5).then((res) => {
            setPoolData(res.data)
        })
    }, []);
    const data = [
        {title:'Racing car sprays burning fuel into crowd.',date:'2022-01-11'},
        {title:'Japanese princess to wed commoner.',date:'2022-01-11'},
        {title:'Australian walks 100km after outback crash.',date:'2022-01-11'},
        {title:'Man charged over missing wedding girl.',date:'2022-01-11'},
        {title:'Los Angeles battles huge wildfires.',date:'2022-01-11'},
    ];
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
            <div className='list'>
                <List
                    header={<div><b>最新</b></div>}
                    dataSource={data}
                    split={true}
                    renderItem={item => <List.Item>
                        <List.Item.Meta
                            title={<a href="">{item.title}</a>}
                        />
                        <div>{item.date}</div>
                    </List.Item>
                }
                >

        </List>
            </div >
        </div >
    )
}
export default Blog