import React, { Component } from 'react'
import { Table, Button } from 'antd'
import { getActiveList } from '@/api'

class Active extends Component {
  constructor(props) {
    super(props)
    this.getActive()
    this.state = {
      dataList: [
        {
          title: '',
          created_date: '',
          key: '',
        },
      ],
    }
    this.getActive = this.getActive.bind(this)
    this.Check = this.Check.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }
  handleAdd() {
    this.props.history.push('/Admin/ActiveEdit')
  }
  Check(data) {
    console.log(data)
  }
  getActive() {
    getActiveList(2).then((res) => {
      if (res.success) {
        res.data.forEach((e) => {
          e.key = e.id
        })
        this.setState({
          dataList: res.data,
        })
      }
    })
  }
  render() {
    const dataSource = this.state.dataList
    const columns = [
      {
        title: '活动名称',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '创建时间',
        dataIndex: 'created_date',
        key: 'created_date',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button onClick={this.Check(record)} style={{ marginRight: 16 }}>
              查看
            </Button>
            <Button>编辑</Button>
          </span>
        ),
      },
    ]
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加活动
        </Button>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}
export default Active
