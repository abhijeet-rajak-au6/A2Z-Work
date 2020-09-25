import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import pre_loader from '../img/pre_loader.svg';
import { hireFreelancer, createChatRoom } from '../redux/actions/dataAction'
import '../styles/JobDetailsPage.css'

const initialState = {
    pre_loader: "none",
    submit_button: "inline-block",
    starRating: "",
}

class JobApplication extends Component {
    state = initialState
    componentDidMount() {
        (() => {
            const freelancerRatings = this.props.jobApplication.userId.freelancerAverageRating
            const starPercentage = (freelancerRatings / 5) * 100;

            // Round to nearest 10
            const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

            // Set width of stars-inner to percentage
            this.setState({ starRating: starPercentageRounded })
        })()
    }
    handleClickViewProfile = (event) => {
        this.props.history.push(`/FreelancerProfileViewPage/${event.target.value}`)
    }

    handleClickHireFreelancer = async (event) => {
        this.setState({ pre_loader: "inline-block", submit_button: "none" })
        const freelancerId = event.target.value
        const jobId = this.props.jobApplication.jobId
        const userId = JSON.parse(localStorage.getItem("user")).userId
        try {
            const response = await this.props.hireFreelancer(jobId, freelancerId, userId)
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
    handleClickMessage = async (event) => {
        event.persist()
        try {
            const response = await this.props.createChatRoom(event.target.value)
            if (response) {
                this.props.history.push(`/messages?freelancerId=${event.target.value}`)
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }
    render() {

        return (
            <>
                {this.props.jobApplication.jobStatus === "applied" &&
                    <div className="job-application border-bottom mb-3">
                        <div className="job-application-title">
                            <h5 className="mr-auto">{this.props.index + 1}. Name : {this.props.jobApplication.userId.userName}</h5>
                            <div className="job-application-button-container">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                                <button style={{ display: this.state.submit_button }} onClick={this.handleClickHireFreelancer} className="btn btn-success mx-3" value={this.props.jobApplication.userId._id}>Hire</button>
                                <button onClick={this.handleClickViewProfile} className="btn btn-success" value={this.props.jobApplication.userId._id}>View profile</button>
                                <button onClick={this.handleClickMessage} className="btn btn-success mx-3" value={this.props.jobApplication.userId._id}>Message</button>
                            </div>
                        </div>
                        <div className="stars-outer ml-3">
                            <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                        </div>
                        <span className="number-rating px-3"> {this.props.jobApplication.userId.freelancerAverageRating} of {this.props.jobApplication.userId.workHistory.length} reviews</span>
                        <div className="cover-letter my-3 mx-3">
                            <h6>Cover Letter : </h6>
                            <p className="mx-3">{this.props.jobApplication.coverLetter}</p>
                        </div>
                    </div>
                }
                {this.props.jobApplication.jobStatus === "accepted" &&
                    <div className="job-application my-3">
                        <div className="job-application-title">
                            <h5 className="mr-auto">Name : {this.props.jobApplication.userId.userName} (Working on this job)</h5>
                            <div className="job-application-button-container">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                                <button onClick={this.handleClickViewProfile} className="btn btn-success" value={this.props.jobApplication.userId._id}>View profile</button>
                                <button onClick={this.handleClickMessage} className="btn btn-success mx-3" value={this.props.jobApplication.userId._id}>Message</button>
                            </div>
                        </div>
                        <div className="stars-outer ml-3">
                            <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                        </div>
                        <span className="number-rating px-3"> {this.props.jobApplication.userId.freelancerAverageRating} of {this.props.jobApplication.userId.workHistory.length} reviews</span>
                        <div className="cover-letter my-3 mx-3">
                            <h6>Cover Letter : </h6>
                            <p className="mx-3">{this.props.jobApplication.coverLetter}</p>
                        </div>
                    </div>}
                {this.props.jobApplication.jobStatus === "completed" &&
                    <div className="job-application my-3">
                        <div className="job-application-title">
                            <h5 className="mr-auto">Name : {this.props.jobApplication.userId.userName} (Worked on this job)</h5>
                            <div className="job-application-button-container">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                                <button onClick={this.handleClickViewProfile} className="btn btn-success" value={this.props.jobApplication.userId._id}>View profile</button>
                                <button onClick={this.handleClickMessage} className="btn btn-success mx-3" value={this.props.jobApplication.userId._id}>Message</button>
                            </div>
                        </div>
                        <div className="stars-outer ml-3">
                            <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                        </div>
                        <span className="number-rating px-3"> {this.props.jobApplication.userId.freelancerAverageRating} of {this.props.jobApplication.userId.workHistory.length} reviews</span>
                        <div className="cover-letter my-3 mx-3">
                            <h6>Cover Letter : </h6>
                            <p className="mx-3">{this.props.jobApplication.coverLetter}</p>
                        </div>
                    </div>}


            </>

        )
    }
}

export default connect(null, { hireFreelancer, createChatRoom })(withRouter(JobApplication))