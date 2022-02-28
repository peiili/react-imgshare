import React from 'react'
import Head from 'next/head'
import { Row, Col, Button, Space } from 'antd'
import Layout from '@/pages/Home/Layouts'
import RadioBtnGroup from './component/radiobtngroup'
const handleClick = function (id, i) {

}
const data = {
    pageSize: [
        { title: 'A5(常用)', size: '210mmx148mm', width: 210, height: 148 },
        { title: 'A4', size: '210mmx297mm', width: 210, height: 297 },
        { title: '自定义', size: '任意大小', width: 0, height: 0 }
    ],
    photoSize: [
        { title: '小一寸', size: '22mmx32mm', width: 22, height: 32 },
        { title: '一寸', size: '25mmx35mm', width: 25, height: 34 },
        { title: '大一寸', size: '23mmx48mm', width: 23, height: 48 },
        { title: '小二寸', size: '35mmx45mm', width: 35, height: 45 },
        { title: '二寸', size: '35mmx49mm', width: 35, height: 49 },
        { title: '自定义', size: '任意尺寸', width: 0, height: 0 }
    ],
    rowSetup: [
        { title: '8张', size: '2行4列', row: 2, col: 4 },
        { title: '4张', size: '2行2列', row: 2, col: 2 },
        { title: '自定义', size: '任意行列', row: 0, col: 0 }
    ],
    lineStyle: [
        { title: '否', style: 'none' },
        { title: '虚线', style: 'dotted' },
        { title: '实线', style: 'solid' }
    ],
}
const Typeset = () => {
    return (
        <>
            <Head>
                <title>证件照排版</title>
            </Head>
            <Layout>
                <Space direction='vertical' style={{ width: '100%' }}>
                    <div>
                        <RadioBtnGroup id='pageSize' title='纸张大小：' list={data['pageSize']} col={3} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                        <RadioBtnGroup id='photoSize' title='照片规格：' list={data['photoSize']} col={3} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                        <RadioBtnGroup id='rowSetup' title='行列设置：' list={data['rowSetup']} col={3} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                        <RadioBtnGroup id='lineStyle' title='裁剪辅助线：' list={data['lineStyle']} col={3} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                    </div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Button style={{ width: '100%' }} type='primary'>保存</Button>
                        </Col>
                        <Col span={8}>
                            <Button style={{ width: '100%' }} type='primary'>选择照片</Button>
                        </Col>
                        <Col span={8}>
                            <Button style={{ width: '100%' }} type='primary'>开始排版</Button>
                        </Col>
                    </Row>
                </Space>
            </Layout>

        </>
    )
}
export default Typeset