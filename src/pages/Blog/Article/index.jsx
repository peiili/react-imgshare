import React from 'react';
const Article = (props)=>{
    const {location} = props
    console.log(location);
    return (
        <>
            <div>
                {location.search}
                张三
            </div>
        </>
    )
};
export default Article;