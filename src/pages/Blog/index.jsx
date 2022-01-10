import React,{useState,useEffect} from 'react';
import { Row, Col, Carousel, Button } from 'antd'
import { carouselList } from '@/api/index.js'
const Blog = ()=>{
    const [poolData,setPoolData] = useState([])
    useEffect(() => {
        carouselList(5).then((res) => {
            setPoolData(res.data)
        })
    }, []);
    return (
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
    )    
}
export default Blog