import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Imgblock from './Home/Imgblock'
import { carousePageServerSide, carouselListServerSide } from '@/api/index.js'
import { hashDecode } from '@/tools/BlurHashToBase64.ts'
export async function getServerSideProps() {
  const res1 = await carousePageServerSide({
    size: 12,
    page: 1,
    desc: true
  })
  let pageListData = []
  if (res1 && res1.success) {
    pageListData = res1.data.map(e => {
      return {
        ...e,
        short: hashDecode(e.short_blurhash, e.short_blurhash_w, e.short_blurhash_h)
      }
    })

  }
  const res2 = await carouselListServerSide(5)
  let CarouselList = []
  if (res2 && res2.success) {
    CarouselList = res2.data.map(e => {
      return {
        ...e,
        short: hashDecode(e.short_blurhash, e.short_blurhash_w, e.short_blurhash_h)
      }
    })
  }
  // Pass data to the page via props
  return { props: { pageListData, CarouselList } }
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.pageListData = props.pageListData
    this.CarouselList = props.CarouselList
  }
  render() {
    return (
      <>
        <Imgblock pageListData={this.pageListData} CarouselList={this.CarouselList}></Imgblock>
      </>
    )
  }
}

export default withRouter(App)
