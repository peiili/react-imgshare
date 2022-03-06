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
  const [previewUrl, setPreviewUrl] = useState('');
  useEffect(() => {
    // 数据改变刷新子组件
    refresh && setTimeout(() => setRefresh(false))
  }, [refresh]);
  const handleClick = function (id, i) {
    setFormData(Object.assign(formData, {
      [id]: {
        active: i,
      }
    }))
    setRefresh(true)

  }
  const uploadImg = function () {
    const input = document.createElement('input')
    input.type = 'file'
    input.click()
    var reader = new FileReader()
    input.addEventListener('change', (e) => {
      const file = input.files[0]
      reader.onload = function (e) {
        setPreviewUrl(e.target.result)
      }
      reader.readAsDataURL(file)
      const formdata = new FormData()
      formdata.append('file', file)
    })
  }
  const startTypeset = function () {
    const activeSetup = {
      pageSize: {
        width: staticData.pageSize[formData.pageSize.active].width,
        height:staticData.pageSize[formData.pageSize.active].height
      },
      photoSize: {
        width: staticData.photoSize[formData.photoSize.active].width,
        height:staticData.photoSize[formData.photoSize.active].height
      },
      rowSetup: {
        row: staticData.rowSetup[formData.rowSetup.active].row,
        col:staticData.rowSetup[formData.rowSetup.active].col
      },
      lineStyle: {
        style: staticData.lineStyle[formData.lineStyle.active].style,
      },
    }
    const canvas = document.getElementById('canvas')
    // 纸张尺寸
    const pageWidth=activeSetup.pageSize.width
    const pageHeight=activeSetup.pageSize.height
    canvas.width = pageWidth
    canvas.height = pageHeight

    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = previewUrl
    // 照片尺寸
    const photoWidth = activeSetup.photoSize.width
    const photoHeight = activeSetup.photoSize.height
    // 照片位置
    // 计算边距

    const colNum = activeSetup.rowSetup.col // 每行个数
    const rowNum = activeSetup.rowSetup.row // 每列个数
    // const countNum = colNum*rowNum
    const borderSizeSpan = (pageWidth-(photoWidth*colNum))/(colNum*2)
    // console.log(borderSizeSpan);
    const borderSizeGutter = (pageHeight-(photoHeight*rowNum))/(rowNum*2)
    // 带上边距以后的尺寸
    // const countWidth = borderSizeSpan*2+photoWidth
    // console.log(countWidth);
    // const countHight = borderSizeGutter*2+photoHeight
    for (let i = 0; i < colNum; i++) {
      for (let j = 0; j < rowNum; j++) {
        ctx.drawImage(image,(i*2+1)*borderSizeSpan+(i*photoWidth),(j*2+1)*borderSizeGutter+(j*photoHeight),photoWidth,photoHeight)
      }
    }
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
              <label htmlFor='uploadFile'>
                <Button size='large' style={{ width: '100%' }} type='primary' onClick={uploadImg}>选择照片</Button>
              </label>
            </Col>
            <Col span={8}>
              <Button size='large' style={{ width: '100%' }} type='primary' onClick={startTypeset}>开始排版</Button>
            </Col>
            <Col span={8}>
              <Button size='large' style={{ width: '100%' }} type='primary'>保存</Button>
            </Col>
          </Row>
          <img style={{ width: '200px' }} src={previewUrl} alt="" />
          <canvas id='canvas' style={{ border: '1px solid red' }}></canvas>
        </Space>
        <div style={{ height: '20vh' }}></div>
      </Layout>
    </>
  )
}
export default Typeset