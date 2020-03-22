import React from 'react'
import PropTypes from 'prop-types'
import './../css/PostItem.css'

// 点赞逻辑处理
function PostItem(props) {
  const handleClick = () => {
    props.onVote(props.post.id)
  }
  const { post } = props
  return (
    <li className="item">
      <div className="title">{post.title}</div>
      <div>
        创建人:<span>{post.author}</span>
      </div>
      <div>
        创建时间:<span>{post.date}</span>
      </div>
      <div className="like">
        <button onClick={handleClick}>点赞</button>
        &nbsp;
        <span>{post.vote}</span>
      </div>
    </li>
  )
}
PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    vote: PropTypes.number
  }).isRequired,
  onVote: PropTypes.func.isRequired
}
export default PostItem
