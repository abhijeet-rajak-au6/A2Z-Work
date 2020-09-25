import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getJobDetails } from '../redux/actions/dataAction'
import { mapToPropsData } from '../redux/mapStateToProps'
import '../styles/JobFeedPage.css'


const initialState = {
    job: null,
    FreelancerReview: null,
    starRating: "",
}

class WorkHistory extends Component {
    state = initialState

    async componentDidMount() {
        try {
            const response = await this.props.getJobDetails(this.props.jobId)
            this.setState({ job: response })
        } catch (err) {
            console.log(err)
        }
    }
    handleClickJobDetails = (event) => {
        this.props.history.push(`/clientJobDetailsPage/${event.target.value}`)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.job !== this.state.job) {
            (() => {
                const freelancerRatings = this.props.dataObj.jobDetails.freelancerReview.ratings
                const starPercentage = (freelancerRatings / 5) * 100;

                // Round to nearest 10
                const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

                // Set width of stars-inner to percentage
                this.setState({ starRating: starPercentageRounded })
            })()
        }
    }

    render() {
        return (
            <>
                {
                    this.state.job && <>
                        <div className="work-history-job border-bottom mb-3">
                            <div className="job-title">
                                <h4 className="mr-auto">{this.props.index + 1}. {this.props.dataObj.jobDetails.jobTitle}</h4>
                                <button onClick={this.handleClickJobDetails} className="btn btn-success mx-3" value={this.props.dataObj.jobDetails._id}>View details</button>
                            </div>
                            <div className="review-container">
                                <div className="stars-outer ml-3">
                                    <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                                </div>
                                <span className="number-rating px-3"> {this.props.dataObj.jobDetails.freelancerReview.ratings}</span>
                                <p className="mx-3">{this.props.dataObj.jobDetails.freelancerReview.feedback}</p>
                            </div>
                            <div className="job-budget-container mx-3 my-3">
                                <span><b>Est-Budget : </b></span>
                                <span className="mx-3">{this.props.dataObj.jobDetails.budgetType}</span>
                                <span>${this.props.dataObj.jobDetails.budgetAmount}.00</span>
                            </div>
                        </div>
                    </>}
            </>
        )
    }
}

export default connect(mapToPropsData, { getJobDetails })(withRouter(WorkHistory))