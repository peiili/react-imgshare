import React, { Component } from 'react'
import { Table, Button, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getActiveList, createActiveEdit } from '@/api'
import { deleteActive } from '@/api/api-active'
import ActiveEdit from '@/pages/admin/ActiveEdit'
import moment from 'moment'
const { confirm } = Modal

class Active extends Component {
  constructor(props) {
    super(props)
    this.getActive()
    this.state = {
      // 当前行数据
      currentId: '',
      showCreated: false,
      showEditActive: false,
      // 数据列表
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
    this.onDeleteActive = this.onDeleteActive.bind(this)
    this.onShowTable = this.onShowTable.bind(this)
    this.onEditSubmit = this.onEditSubmit.bind(this)
    this.onShowCreated = this.onShowCreated.bind(this)
    this.onCreateSubmit = this.onCreateSubmit.bind(this)
  }
  onCreateSubmit(data) {
    // 新增
    createActiveEdit(data).then((res) => {
      if (res.success) {
        message.info('发布成功')
        this.getActive()
        this.resetView()
      }
    })
  }
  resetView() {
    this.setState({
      showCreated: false,
      showEditActive: false,
    })
  }
  onEditSubmit(data) {
    console.log(data)
    // 更新
    return
    createActiveEdit(data).then((res) => {
      if (res.success) {
        message.info('发布成功')
      }
    })
  }
  handleAdd() {
    // this.props.history.push('/Admin/ActiveEdit')
  }
  onShowCreated() {
    this.setState({
      showCreated: true,
    })
  }
  onDeleteActive(data) {
    const _self = this
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除当前活动信息?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteActive({
          id: data.id,
          type: 'DELETE',
        }).then((res) => {
          // 刷新界面
          _self.getActive()
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  Check(data) {
    console.log(data)
  }
  onShowTable() {
    console.log(this)
    this.setState({
      showCreated: false,
    })
  }
  onEdit(data) {
    console.log(data.id)

    this.setState({
      showCreated: true,
      currentId: data.id,
    })
    // this.props.history.push({
    //   pathname: '/Admin/ActiveEdit',
    //   query: { id: data.id },
    // })
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
            <Button onClick={() => this.Check(record)}>查看</Button>
            <Button onClick={() => this.onEdit(record)}>编辑</Button>
            <Button type="danger" onClick={() => this.onDeleteActive(record)}>
              删除
            </Button>
          </Space>
        ),
      },
    ]

    return (
      <div>
        {!this.state.showCreated && !this.state.showEditActive && (
          <div>
            <Button
              onClick={this.onShowCreated}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              添加活动
            </Button>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        )}
        {/* 新增 */}
        {this.state.showCreated && (
          <ActiveEdit
            show={this.onShowTable}
            onEditSubmit={this.onCreateSubmit}
          ></ActiveEdit>
        )}
        {/* 编辑 */}
        {this.state.showEditActive && (
          <ActiveEdit
            show={this.onShowTable}
            currentId={this.state.currentId}
            onEditSubmit={this.onEditSubmit}
          ></ActiveEdit>
        )}
      </div>
    )
  }
}
export default Active
