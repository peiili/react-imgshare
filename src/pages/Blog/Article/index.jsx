import React, { useState, useEffect } from 'react';
import { Typography, Divider, PageHeader } from 'antd'
import { marked } from 'marked'
const { Title, Text } = Typography;
const Article = (props) => {
    const { location,history } = props
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        content: ''
    })
    useEffect(() => {
        setInitialValues(Object.assign(initialValues, {
            title: '测试一下',
            description: '',
            content: marked.parse('# Marked in the browser\n\nRendered by **marked**.')
        }))
    }, [])
    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => history.go(-1)}
                title={initialValues.title}
            />
            <div style={{ margin: '20px' }}>
                <Text type="secondary">{initialValues.description}</Text>
                <Divider plain></Divider>
                <div dangerouslySetInnerHTML={{ __html: initialValues.content }}></div>
            </div>
        </>
    )
};
export default Article;