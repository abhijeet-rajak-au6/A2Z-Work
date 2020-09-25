import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import pre_loader from '../img/pre_loader.svg';

import '../styles/JobDetailsPage.css'

const initialState = {
    pre_loader: "none",
    submit_button: "inline-block",
    starRating: "",
}

class JobApplication extends Component {
    state = initialState
    handleClickWithdrawApplication = async (event) => {
        this.setState({ pre_loader: "inline-block", submit_button: "none" })
        const freelancerId = event.target.value
        const jobId = this.props.jobApplication.jobId
        const userId = JSON.parse(localStorage.getItem("user")).userId
        try {
            const response = await this.props.withdrawApplication(jobId, freelancerId, userId)
            Swal.fire({
                icon: 'success',
                title: `${response}`
            })
            this.setState({ pre_loader: "none", submit_button: "inline-block" })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
            this.setState({ pre_loader: "none", submit_button: "inline-block" })
        }
    }
    render() {

        return (
            <>
                {this.props.jobApplication.jobStatus === "applied" ?
                    <div className="job-application mb-3">
                        <div className="job-application-title">
                            <h5 className="mr-auto">{this.props.index + 1}. Name : {JSON.parse(localStorage.getItem("user")).userName}</h5>
                            <div className="job-application-button-container">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                                <button onClick={this.handleClickWithdrawApplication} className="btn btn-success" value={this.props.jobApplication.userId._id}>Withdraw</button>
                            </div>
                        </div>
                        <div className="cover-letter my-3 mx-3">
                            <h6>Cover Letter : </h6>
                            <p className="mx-3">{this.props.jobApplication.coverLetter}</p>
                        </div>
                    </div>
                    : <div className="job-application my-3">
                        <div className="job-application-title">
                            <h5 className="mr-auto">Name : {JSON.parse(localStorage.getItem("user")).userName}</h5>
                        </div>
                        <div className="cover-letter my-3 mx-3">
                            <h6>Cover Letter : </h6>
                            <p className="mx-3">{this.props.jobApplication.coverLetter}</p>
                        </div>
                    </div>}
            </>

        )
    }
}

export default (withRouter(JobApplication))