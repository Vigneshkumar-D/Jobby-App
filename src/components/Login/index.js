import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitErr: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({errMsg: errorMsg, showSubmitErr: true})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitErr, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <div className="login-page-sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="app-logo"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="username">
              USERNAME
            </label>
            <input
              type="text"
              className="username-input"
              value={username}
              placeholder="Username"
              id="username"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="password-input"
              value={password}
              placeholder="Password"
              id="password"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitErr && <p className="err-msg">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
