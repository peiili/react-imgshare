import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Form, Input, Button } from 'antd'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { setBlogContent, getBlogContent, putBlogContent } from '@/api/articleApi'
// 动态导入模块，正常渲染Browser端api
const SimpleMdeEditor = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
);

const Editor = (props) => {
  const { id } = props;
  const formRef = useRef()
  const selfForm = Form.useForm()
  const [initialValues] = useState({
    title: '',
    description: '',
    keywords: '',
    content: '',
  })
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
      content: values.content,
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
          const { title, description, keywords, content } = res.data[0]
          formRef.current.setFieldsValue({
            title,
            description,
            keywords,
            content,
          })
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
          name="content"
          label="正文"
        >
          <SimpleMdeEditor></SimpleMdeEditor>
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