import React, { useState } from 'react'
import { Row, Col } from 'antd'
import './../css/imgblock.css'
import { useLocation } from "react-router-dom";

// let history = useHistory();
const ImageDetail = () => {
  const search = useLocation().search.split('=')[1]
  const data = JSON.parse(decodeURIComponent(search))
  const [item, setItem] = useState(data);
  return (
    <div>
      <div className="imgWidth">
        <Row>
          <Col span={window.screen.width > 500 ? 12 : 24} offset={window.screen.width > 500 ? 6 : 0}>
            <img
              className="imgWidth"
              alt={item.describe}
              src={'http://www.dlsjf.top/' + item.name}
            />
            <div className="apron" style={{minHeight:'40vh'}}>
              <div className="descText" style={{fontSize:'18px',marginTop:'20px'}}>
                {item.describe.replace(/"/g, '')}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )

}
export default ImageDetail
