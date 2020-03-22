import React, { Component } from 'react'
import { Row, Col, Carousel } from 'antd'
import moment from 'moment'
import Zmage from 'react-zmage'
import './../css/imgblock.css'
import { carouselList } from './../api/index.js'
class ImgBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poolData: [],
      pageList: []
    }
    this.getCarouselList()
    this.getCarouselListAll()
  }
  getCarouselList() {
    carouselList(5).then(res => {
      this.setState({
        poolData: res.data
      })
    })
  }
  getCarouselListAll = () => {
    carouselList(20).then(res => {
      this.setState({
        pageList: res.data
      })
    })
  }
  render() {
    return (
      <div>
        <Carousel autoplay={true}>
          {this.state.poolData.map(item => (
            <div key={item.id}>
              <img
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover'
                }}
                alt={item.describe}
                src={'https://www.dlsjf.top/' + item.name}
              ></img>
            </div>
          ))}
        </Carousel>
        <div onClick={this.getCarouselListAll}>换一批</div>
        <Row gutter={[16, 20]}>
          {this.state.pageList.map(item => (
            <Col span={6} key={item.id}>
              <div className="imgblock">
                {/* <img
                  className="imgWidth"
                  alt={item.describe}
                  src={'http://www.dlsjf.top/' + item.name}
                ></img> */}
                <Zmage
                  className="imgWidth"
                  alt={item.describe}
                  controller={{ download: true }}
                  hotKey={{
                    // 关闭（ESC）
                    close: true,
                    // 缩放（空格）
                    zoom: true,
                    // 翻页（左右）
                    flip: true
                  }}
                  src={'https://www.dlsjf.top/' + item.name}
                ></Zmage>
                <div className="apron">
                  <div className="descText">
                    {item.describe.replace(/"/g, '')}
                  </div>
                  <div className="info">
                    <div>
                      {' '}
                      {moment(item.create_date).format('YYYY-MM-DD')}{' '}
                      <a
                        target={'_blank'}
                        style={{ float: 'right' }}
                        href={'http://www.dlsjf.top/' + item.name}
                        download={item.describe}
                      >
                        下载
                      </a>
                    </div>
                  </div>
                  {/* <HeartTwoTone style={{ color: 'red' }} /> */}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}
export default ImgBlock
