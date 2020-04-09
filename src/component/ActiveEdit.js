import React, { Component } from 'react'

import { Form, Input, Button, Row, Col, DatePicker } from 'antd'
import { Editor } from '@tinymce/tinymce-react'
const { RangePicker } = DatePicker
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
    console.log('Content was updated:', content)
    this.setState({
      editorValue: content,
    })
  }
  render() {
    const onFinish = (values) => {
      console.log('Success:', values)
      let body = {
        title: values.title,
        desc: values.desc,
        openDate: `${values.openDate[0].format(
          'YYYY-MM-DD HH:mm:ss'
        )}-${values.openDate[1].format('YYYY-MM-DD HH:mm:ss')}`,
        content: this.state.editorValue,
      }
      console.log('body:' + JSON.stringify(body))
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
            name="desc"
            label="简介"
            rules={[{ required: true, message: '请填写简介' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Row>
            <Col>
              <Form.Item
                name="openDate"
                label="开始时间"
                rules={[{ required: true, message: '请填写开始时间' }]}
              >
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </Col>
            {/* <Col>
              <Form.Item
                name="openDate"
                rules={[{ required: true, message: '请填写标题' }]}
              >
                可报名
                <Input />
              </Form.Item>
            </Col> */}
          </Row>
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
export default ActiveEdit
