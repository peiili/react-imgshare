import React, { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Table, Space, Image } from 'antd'
import { getTypeSetPage, getTypeSetPageServerSide } from '@/api/typesetApi'
import moment from 'moment'
const columns = [
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '排版',
    dataIndex: 'typeset',
    key: 'typeset',
  },
  {
    title: '下载',
    dataIndex: 'download',
    key: 'download',
  },
  {
    title: '路径',
    dataIndex: 'xa_path',
    key: 'path',
  },
  {
    title: '预览',
    key: 'img',
    render: (text, record) => (
      <Space>
        <Image width='50px' src={`http://xek.dlsjf.top/${record.xa_path}`}></Image>
      </Space>
    ),
  }
]
const pageSize = 5
const current = 1
export async function getServerSideProps(context) {
  let contents = []
  let count = ''

  const res = await getTypeSetPageServerSide({
    page: current,
    size: pageSize
  })
  if (res.success) {
    count = res.data.count
    contents = res.data.list.map(e => {
      return Object.assign(e, {
        key: e.id,
        create_time: moment(e.create_time).format('YYYY-MM-DD HH:mm')
      })
    })
  }

  return { props: { contents, count } }
}
const Typeset = (props) => {
  const { contents, count } = props
  const [dataList, setDataList] = useState(contents);
  const [loading, setLoading] = useState(false);
  const [pageObj, setPageObj] = useState({
    currentPage: current,
    pageSize: pageSize
  });

  const getData = function (data) {
    setLoading(true)
    getTypeSetPage({
      page: data.current,
      size: data.pageSize
    }).then(res2 => {
      if (res2.success) {
        const contents = res2.data.list.map(e => {
          return Object.assign(e, {
            key: e.id,
            create_time: moment(e.create_time).format('YYYY-MM-DD HH:mm')
          })
        })
        setDataList(contents)
        setLoading(false)
        setPageObj({
          currentPage: data.current,
          pageSize: data.pageSize
        })

      }
    })
  }
  return (
    <AdminLayout key={pageObj.currentPage}>
      <Table
        dataSource={dataList}
        columns={columns}
        pagination={{
          current: pageObj.currentPage,
          pageSize: pageObj.pageSize,
          total: count
        }}
        loading={loading}
        onChange={getData} />
    </AdminLayout>
  )
}
export default Typeset;