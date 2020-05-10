import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, DatePicker } from 'antd'

import moment from 'moment'
import { Editor } from '@tinymce/tinymce-react'
// const { RangePicker } = DatePicker
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
}

class ActiveEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorValue: '',
    }
  }

  handleEditorChange = (content, editor) => {
    this.setState({
      editorValue: content,
    })
  }
  goBack = () => {
    this.props.show()
  }
  render() {
    const onFinish = (values) => {
      let body = {
        title: values.title,
        desc: values.description,
        type: 2,
        address: values.address,
        openDate: moment(values.openDate).format('YYYY-MM-DD HH:mm'),
        content: this.state.editorValue,
      }
      this.props.onEditSubmit(body)
    }

    return (
      <div id="ActiveEdit">
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请填写标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="简介"
            rules={[{ required: true, message: '请填写简介' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="address"
            label="地点"
            rules={[{ required: true, message: '地点' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="openDate"
            label="开始时间"
            rules={[{ required: true, message: '请填写开始时间' }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Editor
            apiKey="ocrbpn7ia4kvstfxk6hvcjhscdoy0520g6smzdynczfz7ef0"
            initialValue=""
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                // eslint-disable-next-line no-multi-str
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={this.handleEditorChange}
          />
          <div style={{ marginTop: '10px' }}>
            <Form.Item>
              <Button onClick={this.goBack}>取消</Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    )
  }
}
ActiveEdit.propTypes = {
  show: PropTypes.func.isRequired,
  currentId: PropTypes.number,
  onEditSubmit: PropTypes.func.isRequired,
}
export default ActiveEdit
