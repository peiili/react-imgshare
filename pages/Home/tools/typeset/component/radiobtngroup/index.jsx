import React from 'react'
import { Typography, Row, Col } from 'antd'
import RadioBtn from '@/pages/Home/tools/typeset/component/radiobtn/radiobtn'

const { Title } = Typography;

const RadioBtnGroup = (props) => {
    const { title, id, list, col, handleClick } = props
    return (
        <>
            <Title level={4}>{title}</Title>
            <Row gutter={[16, 8]}>
                {list.map((e, i) => {
                    return (
                        <Col span={24 / col || 24 / list.length}>
                            <RadioBtn active={true} title={e.title} size={e.size} onClick={handleClick(id, i)}></RadioBtn>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}
export default RadioBtnGroup;