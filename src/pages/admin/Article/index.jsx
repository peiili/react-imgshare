import React, { useEffect, useState } from 'react'
import { Table, Button, Space } from 'antd'
import moment from 'moment'
import { getBlogList } from '@/api/articleApi'
import Editor from './Editor'
const Article = () => {
  const [dataList, setDataList] = useState([])
  const [show, setShow] = useState('list')
  const [currentId, setCurrentId] = useState('')
  const getActive = () => {
    const params = {
      type: '2',
      fuzzy: '',
      page: 1,
      size: 10,
  }
    getBlogList(params).then((res) => {
      if (res.success) {
        res.data.forEach((e) => {
          e.key = e.id
        })
        setDataList(res.data)
      }
    })
  }
  // onDeleteActive().then(()=>{

  // })
  const onShowCreated = () => {
    setShow('add')
  }
  const onEdit = (record) => {
    console.log(record.id);
    setCurrentId(record.id)
    setShow('edit')
  }
  useEffect(() => {
    getActive()
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
          {/* <Button type="danger" onClick={() => onDeleteActive(record)}>
            删除
          </Button> */}
        </Space>
      ),
    },
  ]

  return (
    <>
      {show === 'list' &&
        <div>
          <Button
            onClick={onShowCreated}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            添加活动
          </Button>
          <Table
          dataSource={dataList}
          columns={columns}
          pagination={{
            current:'1',
            total:'50'
          }}
          size="small"/>
        </div>
      }
      {show === 'add' && <Editor name='add' goBack={() => {
        setShow('list')
      }} submit={() => {
        setShow('list')
      }}></Editor>
      }
      {
        show === 'edit' && <Editor name='edit' id={currentId} goBack={() => {
          setShow('list')
        }} submit={() => {
          setShow('list')
        }}></Editor>
      }

    </>
  )
}

export default Article