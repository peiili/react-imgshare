import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button } from 'antd'
import Editormd from '@/components/Editormd'
import { setBlogContent, getBlogContent, putBlogContent } from '@/api/articleApi'

const Editor = (props) => {
  const { id } = props;
  const formRef = useRef()
  const selfForm = Form.useForm()
  const [initialValues] = useState({
    title: '',
    description: '',
    keywords: '',
    marked: '',
  })
  const marked_content = {
    marked: '',
    content: ''
  }
  // const [marked_content, setMarked_content] = useState({
  //   marked: '',
  //   content: ''
  // })
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  }
  const onFinish = (values) => {
    let body = {
      title: values.title,
      description: values.description,
      keywords: values.keywords,
      type: 2,
      status: 1,
      content: marked_content.content,
      marked: marked_content.marked,
    }
    if (id) {
      putBlogContent({ id, ...body }).then(res => {
        if (res.success) {
          props.submit(body)
        }
      })
    } else {
      setBlogContent(body).then(res => {
        if (res.success) {
          props.submit(body)
        }
      })
    }
  }
  const goBack = () => {
    props.goBack()
  }
  useEffect(() => {
    if (id) {
      getBlogContent(id).then(res => {
        if (res.success) {
          const { title, description, keywords, marked, content } = res.data[0]
          formRef.current.setFieldsValue({
            title,
            description,
            keywords,
            marked,
          })
          marked_content.marked = marked
          marked_content.content = content
        }
      })
    }
  }, [id, selfForm])
  return (
    <div id="ActiveEdit">
      <Form
        {...layout}
        ref={formRef}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={initialValues}
      >
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
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="keywords"
          label="关键字"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="marked"
          label="正文"
        >
          <Editormd submit={(contents) => {
            console.log(contents)
            marked_content.marked = contents._marked
            marked_content.content = contents._html
            console.log(marked_content)
          }} />
        </Form.Item>

        <div style={{ marginTop: '10px' }}>
          <Form.Item>
            <Button onClick={goBack}>取消</Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}
export default Editor;
