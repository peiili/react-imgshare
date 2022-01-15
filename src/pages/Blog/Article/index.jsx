import React, { useState, useEffect } from 'react';
import { Typography, Divider, PageHeader } from 'antd'
import { marked } from 'marked'
import { getBlogContent } from '@/api/articleApi'
import querySearch from '@/assets/js/querySearch'
const { Text } = Typography;
const Article = (props) => {
    const { location,history } = props
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        content: ''
    })
    useEffect(() => {
       const Obj =  querySearch(location.search.slice(1))
        getBlogContent(Obj.id).then(res=>{
            if(res.success){
                const {title,description,content} = res.data[0]
                setInitialValues({
                    title,
                    description,
                    content: marked.parse(content),
                })
            }
        })
    }, [initialValues, location.search])
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