import React,{useEffect,useState} from 'react'
import { Row, Col } from 'antd'
import { useRouter } from 'next/router'
import style from './index.module.css'
import Layout from '../Layouts'
const ImageDetail = () => {
  const router = useRouter();
  const [item,setItem] = useState({});
  const [windowWidth,setWindowWidth] = useState(0);
  useEffect(()=>{
    const search = router.query.data
    if(router.query.data){
        setItem(JSON.parse(decodeURIComponent(search)))
    }
    setWindowWidth(window.screen.width)

  },[router.query.data])
  return (
    <Layout>
      <div className={style.imgWidth}>
        <Row>
          <Col span={windowWidth> 500 ? 12 : 24} offset={windowWidth> 500 ? 6 : 0}>
            <img
              className={style.imgWidth}
              alt={item.describe}
              src={'http://www.dlsjf.top/' + item.name}
            />
            <div className={style.apron} style={{minHeight:'40vh'}}>
              <div className={style.descText} style={{fontSize:'18px',marginTop:'20px'}}>
                {item.describe?.replace(/"/g, '')}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  )

}
export default ImageDetail
