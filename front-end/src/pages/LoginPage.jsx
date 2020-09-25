import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';
// import GitHubLogin from 'react-github-login';
// import LinkedIn from 'react-linkedin-login-oauth2';
import google_icon from '../img/google_icon.svg'
// import linkedin_icon from '../img/linkedin_icon.svg';
import { userLogin, userSocialLogin } from '../redux/actions/userAction'
import { mapToPropsUser } from '../redux/mapStateToProps'
import pre_loader from '../img/pre_loader.svg';
import '../styles/LoginPage.css'

const initialState = {
    email: "",
    password: "",
    pre_loader: "none",
    submit_button: "block"
}

class LoginPage extends Component {
    state = initialState
    handleChangeLogin = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    responseFacebook = async (response) => {
        console.log("Facebook", response)
        if (!response.status) {
            const currentUser = {
                userEmail: response.email,
                socialLoginId: response.userID,
            }
            console.log("currentUser", currentUser)
            try {
                const response = await this.props.userSocialLogin(currentUser)
                Swal.fire({
                    icon: 'success',
                    title: `${response.msg}`,
                })

                if (response.isClient) {
                    this.props.history.push("/clientProfile")
                } else if (response.isFreelancer) {
                    this.props.history.push("/freelancerProfile")
                }
            } catch (err) {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: `${err}`,
                })
                this.setState(initialState)
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: `${response.status}`,
            })
            this.setState(initialState)
        }
    }
    responseGoogleOnSuccess = async (response) => {
        console.log("Google", response)
        const currentUser = {
            userEmail: response.profileObj.email,
            socialLoginId: response.profileObj.googleId,
        }

        console.log("user", currentUser)
        try {
            const response = await this.props.userSocialLogin(currentUser)
            Swal.fire({
                icon: 'success',
                title: `${response.msg}`,
            })

            if (response.isClient) {
                this.props.history.push("/clientProfile")
            } else if (response.isFreelancer) {
                this.props.history.push("/freelancerProfile")
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
            this.setState(initialState)
        }
    }
    responseGoogleOnFailure = (response) => {
        console.log("Google", response)
        Swal.fire({
            icon: 'error',
            title: `${response.error}`,
        })
        this.setState(initialState)
    }
    // responseGithubOnSuccess = (response) => {
    //     console.log("Github", response)
    // }
    // responseGithubOnFailure = (response) => {
    //     console.log("Github", response)
    // }
    // handleSuccessLinkedin = (response) => {
    //     console.log("Linkedin", response)
    // }
    // handleFailureLinkedin = (response) => {
    //     console.log("Linkedin", response)
    // }
    handleSubmitLogin = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader: !this.state.pre_loader, submit_button: "none" })
        const currentUser = {
            userEmail: this.state.email,
            password: this.state.password
        }
        try {
            const response = await this.props.userLogin(currentUser)
            Swal.fire({
                icon: 'success',
                title: `${response.msg}`,
            })

            if (response.isClient) {
                this.props.history.push("/clientProfile")
            } else if (response.isFreelancer) {
                this.props.history.push("/freelancerProfile")
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
            this.setState(initialState)
        }

    }
    componentWillUnmount() {
        this.setState(initialState)
    }
    handleClickSignup = () => {
        this.props.history.push("/register")
    }
    render() {
        return (
            <div className="login-container">
                <div className="login-form-container">
                    <h4 className="my-4">Log in and get to work</h4>
                    <form onSubmit={this.handleSubmitLogin}>
                        <div className="login-input-container">
                            <i className="fa fa-envelope email-icon" aria-hidden="true"></i>
                            <input onChange={this.handleChangeLogin} className="email-input-field" type="email" name="email" placeholder="Email" value={this.state.email} required />
                        </div>
                        <div className="login-input-container-psw">
                            <i className="fa fa-key password-icon" aria-hidden="true"></i>
                            <input onChange={this.handleChangeLogin} className="password-input-field" type="password" name="password" placeholder="Password" value={this.state.password} required />
                        </div>
                        <div className="error-message">
                            <Link to="/forgotPassword"><p>Forgot password?</p></Link>
                        </div>
                        <div className="pre-loader">
                            <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                        </div>
                        <input className="login-button btn-warning"
                            style={{ display: this.state.submit_button }} type="submit" value="Log in" />
                    </form>
                    <div className="login-border">
                        <div className="login-border-line-1"></div>
                        <p className="mx-2 login-border-text"> or </p>
                        <div className="login-border-line-1"></div>
                    </div>
                    <div className="social-media-login">
                        <FacebookLogin
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="facebook-login-button"
                            textButton="Sign in with Facebook"
                            icon="fa-facebook px-3"
                        />
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                            render={renderProps => (
                                <button className="google-login-button" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={google_icon} alt="Google" width="20" height="20" style={{ marginRight: "10px" }} />Sign in with Google</button>
                            )}
                            onSuccess={this.responseGoogleOnSuccess}
                            onFailure={this.responseGoogleOnFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                        {/* <GitHubLogin
                            clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
                            redirectUri=""
                            scope="user"
                            onSuccess={this.responseGithubOnSuccess}
                            onFailure={this.responseGithubOnFailure}
                            className="github-login-button"
                            buttonText="Sign in with GitHub"
                        /> */}
                        {/* <LinkedIn
                            clientId={process.env.REACT_APP_LINKEDIN_APP_ID}
                            onFailure={this.handleFailureLinkedin}
                            onSuccess={this.handleSuccessLinkedin}
                            redirectUri="http://localhost:3000/linkedin"
                            scope="r_liteprofile,r_emailaddress"
                            renderElement={({ onClick, disabled }) => (
                                <button className="linkedin-login-button" onClick={onClick} disabled={disabled}><img src={linkedin_icon} alt="Linkedin" width="24" height="24" style={{ marginRight: "10px" }} />Sign in with LinkedIn</button>
                            )}
                        /> */}
                    </div>
                    <div className="login-border">
                        <div className="login-border-line-2"></div>
                        <p className="mx-2 login-border-text">New to A2ZWORK?</p>
                        <div className="login-border-line-2"></div>
                    </div>
                    <div className="signup-section">
                        <button onClick={this.handleClickSignup} className="login-signup-button btn-warning">Sign Up</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapToPropsUser, { userLogin, userSocialLogin })(LoginPage)