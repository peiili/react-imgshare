import React, { useEffect, useState } from "react"
import Observe from '@/tools/Observe'
import Head from 'next/head'

import style from './index.module.css'
import { onFull, onExitFull } from '../../../tools/fullscreen'
import renderTime from '../../../tools/compute'
import { Button, Drawer, DatePicker, Upload } from 'antd';
import { SettingOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
let setTime = -1;
const getBase64 = (img, cb) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    cb(reader.result)
  })
  reader.readAsDataURL(img)
}
const Applications = function () {
  // 时间补零
  const [dayLeft, setDayLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [target, setTarget] = useState(new Date().getFullYear() + '-12-31 00:00:00');
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    Observe.fire('loading', false)
    document.querySelector('html').style.fontSize = window.innerWidth / 100 + 'px'
    const resetSize = function () {
      document.querySelector('html').style.fontSize = window.innerWidth / 100 + 'px'
    }
    window.addEventListener('resize', resetSize)

    const $timer = document.getElementById('timer')
    let moveOffsetX = 0
    let moveOffsetY = 0
    let targetWidth = 0
    let targetHeight = 0
    function onMousedown(event) {
      moveOffsetX = event.offsetX
      moveOffsetY = event.offsetY
      targetWidth = event.target.getBoundingClientRect().width
      targetHeight = event.target.getBoundingClientRect().height
      document.addEventListener('mousemove', onMousemove)

    }
    function onMousemove(event) {
      let y = event.y - moveOffsetY
      let x = event.x - moveOffsetX
      if (y <= 0) {
        y = 0
      }
      if (x <= 0) {
        x = 0
      }
      if (y + targetHeight > window.innerHeight) {
        y = window.innerHeight - targetHeight

      }
      if (x + targetWidth > window.innerWidth) {
        x = window.innerWidth - targetWidth

      }
      localStorage.setItem('x', x)
      localStorage.setItem('y', y)
      setTop(y)
      setLeft(x)

    }
    function onMouseup() {
      document.removeEventListener('mousemove', onMousemove)
    }
    $timer.addEventListener('mousedown', onMousedown)
    document.addEventListener('mouseup', onMouseup)
    setLeft(localStorage.getItem('x') || 0)
    setTop(localStorage.getItem('y') || 0)
    const url = localStorage.getItem('background') || 'https://xek.dlsjf.top/20230419.jpeg'
    setImageUrl(url)
    start()
    return () => {
      clearInterval(setTime);
      window.removeEventListener('resize', resetSize)
    }
  }, [])
  function start() {
    setTime = setInterval(function () {
      const { secondsCount, dayLeft, hoursLeft, minutesLeft, secondsLeft } = renderTime(target, 'YYYY-MM-DD HH:mm:ss')
      setDayLeft(dayLeft)
      setHoursLeft(hoursLeft)
      setMinutesLeft(minutesLeft)
      setSecondsLeft(secondsLeft)
      // 倒计时结束时清除计时器执行其它逻辑
      if (secondsCount <= 0) {
        clearInterval(setTime);
      }
    }, 1000);
  }
  useEffect(() => {
    clearInterval(setTime);
    start()
  }, [target])
  function onOpenSetup() {
    setOpen(true)
  }
  function onClose() {
    setOpen(false)
  }
  function onChangeTime(val, dateString) {
    setTarget(dateString)

  }
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  function onUpload(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        localStorage.setItem('background', url)
      });
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传
      </div>
    </div>
  );
  const colors = ['#ffffff', '#000000', '#3fb4ff', '#8a3fff', '#fc5ac4', '#c9e265', '#ffde59', '#ffbd59', '#ff914d']
  const [activeColor, setActiveColor] = useState(colors[0]);
  return (
    <>
      <Head>
        <title>在线倒数计时器-大力坊</title>
        <meta name="keywords" content="大力坊,倒计时器,公司年会背景,考试倒计时,开盘,放假" />
      </Head>
      <div className={style.main} style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className={style.setup} onClick={onOpenSetup}>
          <SettingOutlined style={{ fontSize: '3rem' }} />
        </div>
        <Drawer title="设置" placement="right" onClose={onClose} visible={open}>
          <Button onClick={onFull}>全屏</Button>
          <Button onClick={onExitFull}>退出全屏</Button>
          <div className={style.label}>目标日期</div>
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime onChange={onChangeTime} allowClear={false} placeholder="选择日期" />
          <div className={style.label}>上传背景</div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={onUpload}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <div className={style.label}>计时器颜色</div>
          <div>
            <div className={style.discbox}>
              {
                colors.map(e => {
                  return (
                    <div
                      key={e}
                      className={`${style.ColorDisc} ${e === activeColor ? style.ColorDiscActive : ''}`}
                      style={{ backgroundColor: e }}
                      onClick={() => {
                        setActiveColor(e)
                      }}
                    ></div>
                  )
                })
              }
            </div>
          </div>
        </Drawer>
        <div id="timer" className={style.box} style={{ color: activeColor, left: left + 'px', top: top + 'px' }}>
          <div className={style.childerBox}>{dayLeft}<span className={style.space}></span>天</div>
          <span className={style.space}></span>
          <div className={style.childerBox}>{hoursLeft}<span className={style.space}></span>时</div>
          <span className={style.space}></span>
          <div className={style.childerBox}>{minutesLeft}<span className={style.space}></span>分</div>
          <span className={style.space}></span>
          <div className={style.childerBox}>{secondsLeft}<span className={style.space}></span>秒</div>
        </div>
      </div>
    </>
  )
}
export default Applications
