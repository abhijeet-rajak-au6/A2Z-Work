import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { sendForgotPasswordEmail } from '../redux/actions/userAction'
import pre_loader from '../img/pre_loader.svg';
import '../styles/LoginPage.css'


const initialState = {
    email: "",
    pre_loader: "none",
    submit_button: "block"
}

class ForgotPasswordPage extends Component {
    state = initialState
    handleChangeEmail = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitEmail = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader: !this.state.pre_loader, submit_button: "none" })
        try {
            const response = await this.props.sendForgotPasswordEmail({ userEmail: this.state.email })
            this.setState({ pre_loader: !this.state.pre_loader })
            this.setState({ submit_button: "block" })
            Swal.fire({
                icon: 'success',
                title: `${response.title}`,
                text: `${response.text}`,
            })
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
        }
        this.setState(initialState)
    }
    render() {
        return (
            <div className="login-container">
                <div className="login-form-container my-5 " style={{ padding: "46px" }}>
                    <h4 className="mb-4">Reset your password</h4>
                    <form onSubmit={this.handleSubmitEmail}>
                        <div className="login-input-container mb-4">
                            <i className="fa fa-envelope email-icon" aria-hidden="true"></i>
                            <input onChange={this.handleChangeEmail} className="email-input-field" type="email" name="email" placeholder="Email" value={this.state.email} required />
                        </div>
                        <div className="pre-loader">
                            <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                        </div>
                        <input className="login-button btn-warning btn-lg mt-2"
                            style={{ display: this.state.submit_button }} type="submit" value="Send reset email" />
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { sendForgotPasswordEmail })(ForgotPasswordPage)