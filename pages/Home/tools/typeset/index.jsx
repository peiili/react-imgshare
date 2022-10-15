import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { Row, Col, Button, Space, message } from 'antd'
import Layout from '@/pages/Home/Layouts'
import RadioBtnGroup from '@/components/radiobtngroup'
import styles from './style.module.css'
import { PlusOutlined } from '@ant-design/icons';
import { uploadFile, updateTypeSet } from '@/api/typesetApi'
import Observe from '@/tools/Observe'
const staticData = {
  pageSize: [
    { title: '5寸(常用)', size: '127mmx88.9mm', width: 127, height: 88.9 },
    { title: '5寸(竖版)', size: '88.9mmx127mm', width: 88.9, height: 127 },
    // { title: 'A5', size: '210mmx148mm', width: 210, height: 148 },
    { title: 'A4', size: '279mmx210mm', width: 279, height: 210 },
    // { title: '自定义', size: '任意大小', width: 0, height: 0 }
  ],
  photoSize: [
    { title: '一寸', size: '25mmx35mm', width: 25, height: 34 },
    { title: '小一寸', size: '22mmx32mm', width: 22, height: 32 },
    { title: '大一寸', size: '23mmx48mm', width: 23, height: 48 },
    { title: '二寸', size: '35mmx49mm', width: 35, height: 49 },
    { title: '小二寸', size: '35mmx45mm', width: 35, height: 45 },
    // { title: '自定义', size: '任意尺寸', width: 0, height: 0 }
  ],
  rowSetup: [
    { title: '8张', size: '2行4列', row: 2, col: 4 },
    { title: '9张（一寸）', size: '3行3列', row: 3, col: 3 },
    { title: '4张', size: '2行2列', row: 2, col: 2 },
    // { title: '自定义', size: '任意行列', row: 0, col: 0 }
  ],
  lineStyle: [
    { title: '否', style: 'none' },
    { title: '虚线', style: 'dash' },
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
let typesetLogId = ''
const Typeset = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [refresh, setRefresh] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const formRef = useRef()
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    Observe.fire('loading', false)
  }, []);
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
    input.accept = 'image/gif,image/jpeg,image/png'
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
      formdata.append('source', '1')
      uploadFile(formdata).then(e => {
        typesetLogId = e.data.id
      })
    })
  }
  /**
   * 开始排版
   * @param {Number}} mutliple 转换倍数
   */
  const startTypeset = function (elementID, action) {
    if (!previewUrl) {
      message.warning('请先上传照片');
      return
    }
    const activeSetup = {
      pageSize: {
        width: staticData.pageSize[formData.pageSize.active].width,
        height: staticData.pageSize[formData.pageSize.active].height
      },
      photoSize: {
        width: staticData.photoSize[formData.photoSize.active].width,
        height: staticData.photoSize[formData.photoSize.active].height
      },
      rowSetup: {
        row: staticData.rowSetup[formData.rowSetup.active].row,
        col: staticData.rowSetup[formData.rowSetup.active].col
      },
      lineStyle: {
        style: staticData.lineStyle[formData.lineStyle.active].style,
      },
    }
    let mutliple = 1
    if (action === 'save') { //计算实际尺寸
      // 倍数 = 目标尺寸（宽 mm）/每英寸mm*单位像素/canvas宽度基数
      mutliple = activeSetup.pageSize.width / 25.4 * 300 / activeSetup.pageSize.width
    } else {
      // 在设备预览的尺寸
      if (window.screen.width > 600) {
        mutliple = 500 / activeSetup.pageSize.width
      } else {
        mutliple = formRef.current.offsetWidth / activeSetup.pageSize.width
      }
    }
    const canvas = document.getElementById(elementID)
    // 纸张尺寸
    const pageWidth = activeSetup.pageSize.width * mutliple
    const pageHeight = activeSetup.pageSize.height * mutliple
    // 设置画布大小
    canvas.width = pageWidth
    canvas.height = pageHeight
    const ctx = canvas.getContext('2d')
    // 填充画布背景色
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pageWidth, pageHeight);
    // 照片尺寸
    const photoWidth = activeSetup.photoSize.width * mutliple
    const photoHeight = activeSetup.photoSize.height * mutliple
    const colNum = activeSetup.rowSetup.col // 每行个数
    const rowNum = activeSetup.rowSetup.row // 每列个数
    // 计算边距
    const borderSizeSpan = (pageWidth - (photoWidth * colNum)) / (colNum * 2)
    const borderSizeGutter = (pageHeight - (photoHeight * rowNum)) / (rowNum * 2)

    drarwImage(ctx, colNum, rowNum, borderSizeSpan, borderSizeGutter, photoWidth, photoHeight, () => {
      // 绘制分割线
      if (activeSetup.lineStyle.style !== 'none') {
        drawline(ctx, colNum, rowNum, borderSizeSpan, borderSizeGutter, photoWidth, photoHeight, activeSetup.lineStyle.style)
      }
      if (action === 'save') {
        const dataURL = canvas.toDataURL('image/jpeg')
        const a = document.createElement('a')
        a.download = staticData.pageSize[formData.pageSize.active].title + '-' + staticData.photoSize[formData.pageSize.active].title
        a.href = dataURL
        a.click()
      }
    })
    const params = action === 'save' ? { id: typesetLogId, download: '1' } : { id: typesetLogId, start: '1' }
    updateTypeSet(params).then(res => {
      if (res.success) {

      }
    })
  }
  const drarwImage = (ctx, colNum, rowNum, borderSizeSpan, borderSizeGutter, photoWidth, photoHeight, cb) => {
    const image = new Image()
    image.src = previewUrl
    image.onload = () => {
      // 绘制照片排版
      for (let i = 0; i < colNum; i++) {
        for (let j = 0; j < rowNum; j++) {
          ctx.drawImage(image, (i * 2 + 1) * borderSizeSpan + (i * photoWidth), (j * 2 + 1) * borderSizeGutter + (j * photoHeight), photoWidth, photoHeight)
        }
      }
      cb()
    }
  }
  const drawline = (ctx, colNum, rowNum, borderSizeSpan, borderSizeGutter, photoWidth, photoHeight, style) => {
    // 绘制纵向线
    for (let i = 0; i < colNum - 1; i++) {
      for (let j = 0; j < rowNum; j++) {
        ctx.beginPath()
        if (style === 'dash') {
          ctx.setLineDash([5, 5])
        }
        const x = (2 * i + 2) * borderSizeSpan + ((i + 1) * photoWidth)
        const y = (2 * j) * borderSizeGutter + (j * photoHeight)
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + 2 * borderSizeGutter + photoHeight)
        ctx.strokeStyle = '#cecece'
        ctx.stroke()
      }
    }
    // 绘制横向线
    for (let i = 0; i < colNum; i++) {
      for (let j = 0; j < rowNum - 1; j++) {
        ctx.beginPath()
        if (style === 'dash') {
          ctx.setLineDash([5, 5])
        }
        const x = (2 * i) * borderSizeSpan + (i * photoWidth)
        const y = (2 * j + 2) * borderSizeGutter + ((j + 1) * photoHeight)
        ctx.moveTo(x, y)
        ctx.lineTo(x + 2 * borderSizeSpan + photoWidth, y)
        ctx.strokeStyle = '#cecece'
        ctx.stroke()
      }
    }
  }
  return (
    <>
      <Head>
        <title>证件照排版</title>
        <meta name="keywords" content="证件照排版 一键排版 排版 证件照 手机上怎么排版证件照"></meta>
      </Head>
      <Layout active="/Home/photo">
        <div style={{ height: '2vh' }}></div>
        <div style={{ background: '#fff', paddingBottom: '15vh' }}>
          <Row>
            <Col span={windowWidth > 500 ? 12 : 22} offset={windowWidth > 500 ? 6 : 1}>
              <div className={styles.uploadBlock} onClick={uploadImg}>
                {previewUrl ? <img style={{ height: '12rem' }} src={previewUrl} alt="" /> : <>请上传照片<PlusOutlined /></>}
              </div>
              <Space direction='vertical' style={{ width: '100%' }} size={20}>
                <RadioBtnGroup key={'pageSize'} id='pageSize' title='纸张大小：' list={staticData['pageSize']} active={formData['pageSize'].active} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                <RadioBtnGroup key={'photoSize'} id='photoSize' title='照片规格：' list={staticData['photoSize']} col={3} active={formData['photoSize'].active} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                <RadioBtnGroup key={'rowSetup'} id='rowSetup' title='行列设置：' list={staticData['rowSetup']} active={formData['rowSetup'].active} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                <RadioBtnGroup key={'lineStyle'} id='lineStyle' title='裁剪辅助线：' list={staticData['lineStyle']} active={formData['lineStyle'].active} handleClick={(id, i) => { handleClick(id, i) }}></RadioBtnGroup>
                <Row gutter={16}>
                  <Col span={12}>
                    <Button size='large' style={{ width: '100%' }} type='primary' onClick={() => { startTypeset('canvas') }}>开始排版</Button>
                  </Col>
                  <Col span={12}>
                    <Button size='large' style={{ width: '100%' }} type='primary' onClick={() => { startTypeset('canvas_save', 'save') }}>下载/保存</Button>
                  </Col>
                </Row>
                如果发现板式不合适，请更换纸张大小或行列设置
                <div ref={formRef} style={{ display: 'flex', justifyContent: 'center', marginTop: '0rem', boxShadow: '0 0 2 #ccc' }}>
                  <span style={{ boxShadow: '0 0 20px 2px #ccc', fontSize: 0 }}>
                    <canvas id='canvas'></canvas>
                  </span>
                </div>
                <canvas id='canvas_save' style={{ display: 'none', border: '1px solid red' }}></canvas>
              </Space>
              <div style={{ height: '10vw' }}></div>
            </Col>
          </Row>
        </div>

      </Layout>
    </>
  )
}
export default Typeset
