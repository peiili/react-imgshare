import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button } from 'antd'
import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'
// const easyMDE = new EasyMDE();
const Editor = (props) => {
    const { name, id } = props
    const formRef = useRef()
    const [initialValues, setInitialValues] = useState({
        title:'',
        description:'',
        content:''
    })
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    }
    const onFinish = (values) => {
        console.log(values);
        console.log(initialValues);
        let body = {
            title: values.title,
            desc: values.description,
            type: 3,
            content: values.editorValue,
        }

        props.submit(body)
    } 
    const goBack = () => {
        props.goBack()
    }
    useEffect(() => {
        const easyMDE = new EasyMDE({element: document.getElementById('my-text-area')});
        // easyMDE.value('New input for **EasyMDE**');
        easyMDE.codemirror.on("change", () => {
            // console.log(easyMDE.value());
            setInitialValues(Object.assign(initialValues,{
                content:easyMDE.value()
            }))
        });
    }, [])
    return (
        <>  <div id="ActiveEdit">
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
                    name="content"
                    label="正文"
                >
                   <textarea id="my-text-area"></textarea>
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
        </div></>
    )
}
export default Editor;