import React, { useEffect } from 'react'
import { Button, Form, Input, notification } from 'antd'
import AdminLayout from '@/components/AdminLayout'
import { putSiteBase, getSiteBaseServerSide } from '@/api/websiteApi'
import Observe from '@/tools/Observe'
export async function getServerSideProps() {
  const res = await getSiteBaseServerSide()
  let data = {}
  if (res.success) {
    data = res.data
  }
  return { props: data }
}
const Website = function (props) {
  const { title, description, keywords, host, copyright } = props
  useEffect(() => {
    Observe.fire('loading', false)
  }, [])
  const onFinish = (values) => {
    const data = values
    putSiteBase(data).then(res => {
      const args = {
        message: '提示',
        description:
          '更新成功',
        duration: 2,
      };
      notification.success(args);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <AdminLayout key="/Admin/Website">
      <Form
        name="basic"
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          title,
          description,
          keywords,
          host,
          copyright,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="网站名称"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入网站名称'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="域名"
          name="host"
          rules={[
            {
              required: true,
              message: '请输入网站域名'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="网站简介"
          name="description"
          rules={[
            {
              required: true,
              message: '请输入网站简介'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="关键词"
          name="keywords"
          rules={[
            {
              required: true,
              message: '请输入网站关键词'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="备案信息"
          name="copyright"
          rules={[
            {
              required: true,
              message: '请输入网站备案信息'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </AdminLayout>
  )
}

export default Website
