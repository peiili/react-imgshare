import React from 'react'
// import './../css/style.css'
// 无状态组件 使用函数组件
function Welcome(props) {
  return (
    <div>
      {/* <link rel="./../css/style.css"></link> */}
      <h1
        style={{
          widows: '100%',
          height: '50px',
          backgroundColor: 'yellow',
          fontSize: '20px'
        }}
      >
        Hello,{props.name}
      </h1>
    </div>
  )
}
Welcome.defaultProps = {
  name: 'Stranges'
}
export default Welcome
