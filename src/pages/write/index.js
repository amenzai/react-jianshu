import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class ChildCom extends PureComponent {
  sendParent = val => {
    this.props.onRecieve(val)
  }
  render() {
    return (
      <div>
        <button onClick={() => this.sendParent('来自子组件信息')}>
          子组件向父组件通信
        </button>
        <br />
        <p>{this.props.num}</p>
      </div>
    )
  }
}

class Write extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      num: 1
    }
  }

  componentDidMount = () => {
    console.log(this.props)
  }

  sendChild = () => {
    // this.state.num = 12 // 不要直接设置值
    this.setState({
      num: this.state.num + 1
    }) // 这里是异步的
    console.log(this.state.num)
  }
  recieveInfo = val => {
    alert(val)
  }

  render() {
    const { loginStatus } = this.props
    if (loginStatus) {
      return (
        <div>
          <div>写文章页面</div>
          <div>
            <button onClick={this.sendChild}>向子组件通信</button>
          </div>
          <br />
          <ChildCom num={this.state.num} onRecieve={this.recieveInfo} />
        </div>
      )
    } else {
      return <Redirect to="/login" />
    }
  }
}

const mapState = state => ({
  loginStatus: state.getIn(['login', 'login']),
  testState: state.getIn(['login', 'login'])
})

export default connect(
  mapState,
  null
)(Write)
