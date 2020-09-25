import React, { Component } from 'react'
import FeedbackForm from './FeedbackForm'
import { withRouter } from 'react-router-dom'
import '../styles/JobFeedPage.css'

const jobDescription = (description, letterCount) => {
    if (description.length <= letterCount) {
        return description
    } else {
        return description.slice(0, letterCount) + `...`
    }
}

const initialState = {
    feedbackForm: "none"
}

class JobFeed extends Component {
    state = initialState
    handleClickJobDetails = (event) => {
        this.props.history.push(`/freelancerJobDetailsPage/${event.target.value}`)
    }

    handleClickJobComplete = (event) => {
        this.setState({ feedbackForm: "block" })
    }

    cancelFeedbackForm = () => {
        this.setState({ feedbackForm: "none" })
    }

    render() {
        return (
            <>
                <div className="client-job-data border-bottom py-3" >
                    <div className="job-title">
                        <h5 className="mr-auto">{this.props.index + 1}. {this.props.job.jobTitle}</h5>
                        <button onClick={this.handleClickJobDetails} className="btn btn-success mx-3" value={this.props.job._id}>View details</button>
                        {this.props.job.jobStatus === "ongoing" && <button onClick={this.handleClickJobComplete} className="btn btn-warning" value={this.props.job._id}>Completed</button>}
                    </div>
                    <div className="job-budget-container mx-3 my-3">
                        <span><b>Est-Budget : </b></span>
                        <span className="mx-3">{this.props.job.budgetType}</span>
                        <span>${this.props.job.budgetAmount}.00</span>
                    </div>
                    <p className="ml-3">{jobDescription(this.props.job.jobDescription, 200)}</p>
                </div>
                <div className="feedback-form-container" style={{ display: this.state.feedbackForm }}>
                    <FeedbackForm cancelFeedbackForm={this.cancelFeedbackForm} jobId={this.props.job._id} />
                </div>
            </>
        )
    }
}

export default withRouter(JobFeed)
