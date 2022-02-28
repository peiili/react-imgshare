import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, Button, Space } from 'antd'
import Layout from '@/pages/Home/Layouts'
import RadioBtnGroup from './component/radiobtngroup'

const staticData = {
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
const initialFormData = {
    pageSize: {
        active: 0,
    },
    photoSize: {
        active: 0,
    },
    rowSetup: {
        active: 0,
    },
    lineStyle: {
        active: 0,
    },
}




const Typeset = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        // 数据改变刷新子组件
        refresh && setTimeout(() => setRefresh(false))
    }, [refresh]);
    const handleClick = function (id, i) {
        setFormData(Object.assign(formData, {
            [id]: {
                active: i
            }
        }))
        setRefresh(true)

    }
    const uploadImg = function () {
        const input = document.createElement('input')
        input.type = 'file'
        input.click()
        input.addEventListener('change', (e) => {
            const file = input.files[0]
            const formdata = new FormData()
            formdata.append('file', file)
            console.log(formdata);
        })
    }
    return (
        <>
            <Head>
                <title>证件照排版</title>
            </Head>
            <Layout>
                <div style={{ height: '10vh' }}></div>
                <Space direction='vertical' style={{ width: '100%' }} size={20}>
                    <RadioBtnGroup key={'pageSize'} id='pageSize' title='纸张大小：' list={staticData['pageSize']} active={formData['pageSize'].active} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                    <RadioBtnGroup key={'photoSize'} id='photoSize' title='照片规格：' list={staticData['photoSize']} col={3} active={formData['photoSize'].active} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                    <RadioBtnGroup key={'rowSetup'} id='rowSetup' title='行列设置：' list={staticData['rowSetup']} active={formData['rowSetup'].active} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                    <RadioBtnGroup key={'lineStyle'} id='lineStyle' title='裁剪辅助线：' list={staticData['lineStyle']} active={formData['lineStyle'].active} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Button size='large' style={{ width: '100%' }} type='primary'>保存</Button>
                        </Col>
                        <Col span={8}>
                            <label htmlFor='uploadFile'>
                                <Button size='large' style={{ width: '100%' }} type='primary' onClick={uploadImg}>选择照片</Button>
                            </label>
                        </Col>
                        <Col span={8}>
                            <Button size='large' style={{ width: '100%' }} type='primary'>开始排版</Button>
                        </Col>
                    </Row>
                </Space>
                <div style={{ height: '20vh' }}></div>
            </Layout>

        </>
    )
}
export default Typeset