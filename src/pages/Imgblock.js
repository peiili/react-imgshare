import React, { Component } from 'react'
import { Row, Col, Carousel, Button,Divider } from 'antd'
import moment from 'moment'
import './../css/imgblock.css'

import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { carouselList } from '@/api/index.js'

class ImgBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poolData: [],
      pageList: [],
    }
    this.getCarouselList()
    this.getCarouselListAll()
    
  }
  getCarouselList() {
    carouselList(5).then((res) => {
      this.setState({
        poolData: res.data,
      })
    })
  }
  getCarouselListAll = () => {
    carouselList(20).then((res) => {
      this.setState({
        pageList: res.data,
      })
    })
  }
  render() {
    const { history } = this.props
    return (
      <div>
        <Carousel autoplay={true}>
          {this.state.poolData.map((item) => (
            <div key={item.id}>
              <img
                className="imgStyle"
                alt={item.describe}
                src={'https://www.dlsjf.top/' + item.name}
              ></img>
            </div>
          ))}
        </Carousel>
        <div style={{margin:'20px 0'}}>
        <Button onClick={this.getCarouselListAll} type="primary">
          换一批
        </Button>
        <span>&nbsp;本站图片均来自必应</span>
        </div>
        <Row gutter={[16, 20]}>
          {this.state.pageList.map((item) => (
            <Col span={window.screen.width > 500 ? 6 : 12} key={item.id}>
              <div className="imgblock" onClick={()=>{
                  history.push(`/Home/imageDetail?data=${JSON.stringify(item)}`)
              }}>
                <img
                  className="imgWidth"
                  alt={item.describe}
                  src={'http://www.dlsjf.top/' + item.name+'-123'}
                 />
                <div className="apron">
                  <div className="descText">
                    {item.describe.replace(/"/g, '')}
                  </div>
                  <div className="info">
                    <div>
                      {' '}
                      {moment(item.create_date).format('YYYY-MM-DD')}{' '}
                      <a
                        style={{ float: 'right' }}
                        // eslint-disable-next-line react/jsx-no-target-blank
                        target="_blank"
                        href={'http://www.dlsjf.top/' + item.name}
                        download={item.describe}
                      >
                        <VerticalAlignBottomOutlined />
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
