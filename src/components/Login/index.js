import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import ThemeAndVideoContext from '../context/ThemeAndVideoContext'

import {
  LoginBgContainer,
  FormContainer,
  InputContainer,
  LoginLogoImage,
  LabelInput,
  UserInput,
  CheckboxContainer,
  CheckboxInput,
  ShowPasswordLabel,
  LoginButton,
  SubmitError,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  OnSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const LoginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(LoginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword} = this.state
    const {showSubmitError, errorMsg} = this.state
    const passwordType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#212121' : '#ffffff'
          const color = isDarkTheme ? '#ffffff' : '#212121'
          const formBgColor = isDarkTheme ? '#0F0F0F' : '#ffffff'
          const labelColor = isDarkTheme ? '#ffffff' : '#475569'

          const logoImage = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <LoginBgContainer bgColor={bgColor} color={color}>
              <FormContainer
                formBgColor={formBgColor}
                color={color}
                onSubmit={this.OnSubmitForm}
              >
                <LoginLogoImage src={logoImage} alt="website logo" />
                <InputContainer>
                  <LabelInput labelColor={labelColor} htmlFor="username">
                    USERNAME
                  </LabelInput>
                  <UserInput
                    type="text"
                    id="username"
                    value={username}
                    onChange={this.onChangeUsername}
                    placeholder="Username"
                  />
                </InputContainer>
                <InputContainer>
                  <LabelInput labelColor={labelColor} htmlFor="password">
                    PASSWORD
                  </LabelInput>
                  <UserInput
                    type={passwordType}
                    id="password"
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="Password"
                  />
                  <CheckboxContainer>
                    <CheckboxInput
                      type="checkbox"
                      id="checkbox"
                      onChange={this.onClickShowPassword}
                    />
                    <ShowPasswordLabel
                      labelColor={labelColor}
                      htmlFor="checkbox"
                    >
                      Show Password
                    </ShowPasswordLabel>
                  </CheckboxContainer>
                </InputContainer>
                <LoginButton type="submit">Login</LoginButton>
                {showSubmitError && <SubmitError>*{errorMsg}</SubmitError>}
              </FormContainer>
            </LoginBgContainer>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Login
