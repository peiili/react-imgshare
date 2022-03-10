import React, { useState } from 'react'
import { Typography, Row, Col } from 'antd'
import RadioBtn from '@/components/radiobtn/radiobtn'

const { Title } = Typography;
const RadioBtnGroup = (props) => {
    const { title, id, list, col, handleClick, active } = props
    const [subtitle, setSubtitle] = useState(list[active].title)
    const handleSelect = function (id, i) {
        setSubtitle(list[i].title + '\t' + (list[i].size ? list[i].size : ''))
        handleClick(id, i)
    }
    return (
        <>
            <Title level={4}>{title}&nbsp;<span style={{ color: '#999' }}>{subtitle}</span></Title>
            <Row gutter={[16, 8]}>
                {list.map((e, i) => {
                    return (
                        <Col key={i} span={24 / col || 24 / list.length}>
                            <RadioBtn active={active === i} title={e.title} size={e.size} onClick={() => handleSelect(id, i)}></RadioBtn>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}
export default RadioBtnGroup;