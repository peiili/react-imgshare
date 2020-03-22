import React, { Component } from 'react'
import PostItem from './PostItem'
import Foo from './Foo'
import Life from './life'
import Form from './Form'
import './../css/PostItem.css'
// const data = [
//   { title: '大家一起来讨论React吧', author: '张三', date: '2017-05-06' },
//   { title: '讨论个六啊', author: '李四', date: '2017-05-06' },
//   { title: '和Vue相比怎么样', author: '张六', date: '2017-05-06' }
// ]
class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: [],
      age: 10,
      ages: 10
    }
    this.handadd = this.handadd.bind(this)
    this.timer = null //定时器
    this.handleVote = this.handleVote.bind(this)
  }
  componentDidMount() {
    // 用计时器模拟从后台获取数据
    this.timer = setTimeout(() => {
      this.setState({
        post: [
          {
            id: 1,
            title: '大家一起来讨论React吧',
            author: '张三',
            date: '2017-05-06',
            vote: 0
          },
          {
            id: 2,
            title: '讨论个六啊',
            author: '李四',
            date: '2017-05-06',
            vote: 0
          },
          {
            id: 3,
            title: '和Vue相比怎么样',
            author: '张六',
            date: '2017-05-06',
            vote: 0
          }
        ]
      })
    }, 1000)
  }
  componentWillMount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
  handleVote(id) {
    console.log(this)
    const post = this.state.post.map(item => {
      const newItem = item.id === id ? { ...item, vote: ++item.vote } : item
      return newItem
    })
    // 使用新的posts对象设置state
    this.setState({
      post
    })
  }
  handadd() {
    console.log(this)
    this.setState({
      age: this.state.age + 1
    })
  }
  handadds(item, event) {
    console.log(item)
    console.log(event)
    // console.log(this)
    this.setState({
      ages: this.state.ages + 1
    })
  }
  // 使用es7 语法
  handaddsz = (item, event) => {
    console.log(item)
    console.log(event)
    // console.log(this)
    this.setState({
      ages: this.state.ages + 1
    })
  }
  render() {
    return (
      <div>
        <div>
          <Form />
        </div>
        帖子列表
        <ul>
          <li>大家一起讨论React</li>
          <li>前端框架，你最爱哪一个</li>
          <li>Web App 的时代已经到来</li>
        </ul>
        <ul>
          {this.state.post.map((item, index) => (
            <PostItem
              key={item.id}
              post={item}
              onVote={this.handleVote}
            ></PostItem>
          ))}
        </ul>
        <Foo />
        <button
          onClick={() => {
            this.handadd()
          }}
        >
          又长一岁
        </button>
        <Life name="张三" age={this.state.age} />
        <button onClick={this.handadd}>又长一岁</button>
        <Life name="张三" age={this.state.age} />
        <button onClick={this.handadds.bind(this, '12')}>又长一岁</button>
        <Life name="张三" age={this.state.age} />
        <button onClick={this.handaddsz}>又长一岁</button>
        <Life name="张三" age={this.state.age} />
      </div>
    )
  }
  componentWillReceiveProps() {
    console.log('页面有更新')
  }
}
export default PostList
