import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { Redirect } from "react-router-dom"
import { resetPassword } from '../redux/actions/userAction'
import pre_loader from '../img/pre_loader.svg';
import '../styles/LoginPage.css'


const initialState = {
    newPassword: "",
    confirmPassword: "",
    pre_loader: "none",
    submit_button: "block"
}

class changePasswordPage extends Component {
    state = initialState
    handleChangePassword = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitPassword = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader: !this.state.pre_loader, submit_button: "none" })
        const forgotPasswordToken = this.props.match.params.forgotPasswordToken
        const newPassword = {
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
        }
        try {
            const response = await this.props.resetPassword(forgotPasswordToken, newPassword)
            this.setState({ pre_loader: !this.state.pre_loader, submit_button: "block" })
            Swal.fire({
                icon: 'success',
                title: `${response}`

            })
            this.props.history.push("/login")
        } catch (err) {
            console.error(err)
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
        this.setState(initialState)
    }
    render() {
        return (
            <>
                {localStorage.getItem("forgotPasswordToken") ?
                    <div className="login-container">
                        <div className="login-form-container my-5 " style={{ padding: "46px" }}>
                            <h4 className="mb-4">Change your password</h4>
                            <form onSubmit={this.handleSubmitPassword}>
                                <div className="login-input-container-psw mb-4">
                                    <i className="fa fa-key password-icon" aria-hidden="true"></i>
                                    <input onChange={this.handleChangePassword} className="password-input-field" type="password" name="newPassword" placeholder="New password" value={this.state.newPassword} required />
                                </div>
                                <div className="login-input-container-psw mb-4">
                                    <i className="fa fa-key password-icon" aria-hidden="true"></i>
                                    <input onChange={this.handleChangePassword} className="password-input-field" type="password" name="confirmPassword" placeholder="Confirm password" value={this.state.confirmPassword} required />
                                </div>
                                <div className="pre-loader">
                                    <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                                </div>
                                <input className="login-button btn-warning 
                                btn-lg mt-2" style={{ display: this.state.submit_button }} type="submit" value="Change password" />
                            </form>
                        </div>
                    </div>
                    : <Redirect to="/forgotPassword" />}
            </>

        )
    }
}

export default connect(null, { resetPassword })(changePasswordPage)