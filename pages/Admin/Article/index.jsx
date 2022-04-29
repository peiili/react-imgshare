import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Modal } from 'antd'
import moment from 'moment'
import { getBlogListServerSide, getBlogList, delBlogContent } from '@/api/articleApi'
import AdminLayout from '@/components/AdminLayout'
import Editor from './Editor'

const pageSize = 5
const current = 1
export async function getServerSideProps() {
  // Fetch data from external API
  let count = ''
  const params = {
    type: '2',
    fuzzy: '',
    page: current,
    size: pageSize,
    status: 1
  }
  const res = await getBlogListServerSide(params)
  let data = []
  if (res.success) {
    count = res.data.count
    res.data.list.forEach((e) => {
      e.key = e.id
    })
    data = res.data.list
  }
  // Pass data to the page via props
  return { props: { data, count } }
}
const Article = (props) => {
  const { data, count } = props
  const [dataList, setDataList] = useState(data)
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState('list')
  const [currentId, setCurrentId] = useState('')
  const [delVisible, setDelVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pageObj, setPageObj] = useState({
    currentPage: current,
    pageSize: pageSize
  });
  const getActive = (data) => {
    setLoading(true)
    const params = {
      type: '2',
      fuzzy: '',
      page: data?.current || pageObj.currentPage,
      size: data?.pageSize || pageObj.pageSize,
      status: 1
    }
    getBlogList(params).then((res) => {
      if (res.success) {
        res.data.list.forEach((e) => {
          e.key = e.id
        })
        setDataList(res.data.list)
        setLoading(false)
        setPageObj({
          currentPage: data?.current || pageObj.currentPage,
          pageSize: data?.pageSize || pageObj.pageSize
        })
        setShow('list')
      }
    })
  }
  const onShowCreated = () => {
    setShow('add')
  }
  const onEdit = (record) => {
    setCurrentId(record.id)
    setShow('edit')
  }
  const onDeleteActive = (record) => {
    setCurrentId(record.id)
    setDelVisible(true);
    setShow('del')
  }
  const handleOk = (record) => {
    setConfirmLoading(true)
    delBlogContent(currentId).then(res => {
      if (res.success) {
        setConfirmLoading(false)
        setDelVisible(false)
        getActive()
      }
    })
  }
  const handleCancel = (record) => {
    setDelVisible(false)
  }
  useEffect(() => {
    // getActive()
  }, [])
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'created_date',
      key: 'created_date',
      render: (text, record) =>
      (record.created_date = moment(new Date(record.created_date)).format(
        'YYYY-MM-DD hh:mm'
      )),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          {/* <Button onClick={() => Check(record)}>查看</Button> */}
          <Button onClick={() => onEdit(record)}>编辑</Button>
          <Button type="danger" onClick={() => onDeleteActive(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ]
  return (
    <>
      <AdminLayout key={show + pageObj.currentPage}>
        {(show === 'list' || show === 'del') &&
          <div>
            <Button
              onClick={onShowCreated}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              添加文章
            </Button>
            <Table
              dataSource={dataList}
              columns={columns}
              pagination={{
                current: pageObj.currentPage,
                pageSize: pageObj.pageSize,
                total: count
              }}
              loading={loading}
              onChange={getActive}
            />
          </div>
        }
        {show === 'add' && <Editor name='add' goBack={() => {
          setShow('list')
        }} submit={() => {
          getActive()
        }}></Editor>
        }
        {show === 'edit' && <Editor name='edit' id={currentId} goBack={() => {
          setShow('list')
        }} submit={() => {
          getActive()
        }}></Editor>
        }
      </AdminLayout>
      <Modal
        title=""
        visible={delVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>确认删除</p>
      </Modal>
    </>
  )
}

export default Article