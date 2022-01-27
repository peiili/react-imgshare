import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './../css/PostItem.css'

class PostItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      post: props.post
    }
    this.handleVote = this.handleVote.bind(this)
    this.handleEditPost = this.handleEditPost.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.post !== nextProps.post) {
      this.setState({
        post: nextProps.post
      })
    }
  }
  // 处理点击事件
  handleVote() {
    this.props.onVote(this.props.post.id)
  }
  // 保存／编辑按钮点击后的逻辑
  handleEditPost() {
    const editing = this.state.editing
    if (editing) {
      this.props.onSave({
        ...this.state.post
      })
    }
    this.setState({
      editing: !editing
    })
  }
  // 处理标题变化
  handleTitleChange(event) {
    const newPost = {
      ...this.state.post,
      title: event.target.value
    }
    this.setState({
      post: newPost
    })
  }
  getFormDate() {}

  render() {
    const { post } = this.state
    return (
      <li className="item">
        <div className="title">
          {this.state.editing ? (
            <form>
              <textarea
                value={post.title}
                onChange={this.handleTitleChange}
              ></textarea>
            </form>
          ) : (
            post.title
          )}
        </div>
        <div>
          创建人:<span>{post.author}</span>
        </div>
        <div>
          创建时间:<span>{post.date}</span>
        </div>
        <div className="like">
          <button onClick={this.handleVote}>点赞</button>
          &nbsp;
          <span>{post.vote}</span>
        </div>
        <div>
          <button onClick={this.handleEditPost}>
            {this.state.editing ? '保存' : '编辑'}
          </button>
        </div>
      </li>
    )
  }
}
// 点赞逻辑处理

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    vote: PropTypes.number
  }).isRequired,
  onVote: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}
export default PostItem
