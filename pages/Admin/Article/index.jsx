import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Modal } from 'antd'
import moment from 'moment'
import { getBlogListServerSide,getBlogList, delBlogContent } from '@/api/articleApi'
import AdminLayout from '@/components/AdminLayout'
import Editor from './Editor'
export async function getServerSideProps() {
  // Fetch data from external API
  const params = {
    type: '2',
    fuzzy: '',
    page: 1,
    size: 10,
    status: 1
  }
  const res = await getBlogListServerSide(params)
  let data = []
  if (res.success) {
    res.data.list.forEach((e) => {
      e.key = e.id
    })
    data = res.data.list
  }
  // Pass data to the page via props
  return { props: { data } }
}
const Article = (props) => {
  const { data } = props
  const [dataList, setDataList] = useState(data)
  const [show, setShow] = useState('list')
  const [currentId, setCurrentId] = useState('')
  const [delVisible, setDelVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const getActive = () => {
    const params = {
      type: '2',
      fuzzy: '',
      page: 1,
      size: 10,
      status: 1
    }
    getBlogList(params).then((res) => {
      if (res.success) {
        res.data.list.forEach((e) => {
          e.key = e.id
        })
        setDataList(res.data.list)
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
      <AdminLayout key={show}>
        {(show === 'list'||show === 'del') &&
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
                current: '1',
                total: '50'
              }}
              size="small" />
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