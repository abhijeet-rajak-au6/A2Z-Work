import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getJobDetailsHistory, getClientReview } from '../redux/actions/dataAction'
import { mapToPropsData } from '../redux/mapStateToProps'
import '../styles/JobFeedPage.css'


const initialState = {
    job: null,
    clientReview: null,
    starRating: "",
}

class FreelancerWorkHistory extends Component {
    state = initialState

    async componentDidMount() {
        const jobId = this.props.jobId
        try {
            const response = await this.props.getJobDetailsHistory(jobId)
            const userId = this.props.dataObj.jobDetailsHistory.freelancerReview.freelancerId
            const clientReview = await this.props.getClientReview(jobId, userId)
            Promise.all([clientReview, response])
            this.setState({ job: response, clientReview: clientReview })
        } catch (err) {
            console.log(err)
        }
    }
    handleClickJobDetails = (event) => {
        this.props.history.push(`/clientJobDetailsPage/${event.target.value}`)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.clientReview !== this.state.clientReview) {
            (() => {
                const freelancerRatings = this.props.dataObj.clientReview.clientReview.clientReview.ratings
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
                    this.state.clientReview && <>
                        <div className="work-history-job border-bottom mb-3">
                            <div className="job-title">
                                <h4 className="mr-auto">{this.props.index + 1}. {this.props.dataObj.jobDetailsHistory.jobTitle}</h4>
                                <button onClick={this.handleClickJobDetails} className="btn btn-success mx-3" value={this.props.dataObj.jobDetailsHistory._id}>View details</button>
                            </div>
                            <div className="review-container">
                                <div className="stars-outer ml-3">
                                    <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                                </div>
                                <span className="number-rating px-3"> {this.props.dataObj.clientReview.clientReview.clientReview.ratings}</span>
                                <p className="mx-3">{this.props.dataObj.clientReview.clientReview.clientReview.feedback}</p>
                            </div>
                            <div className="job-budget-container mx-3 my-3">
                                <span><b>Est-Budget : </b></span>
                                <span className="mx-3">{this.props.dataObj.jobDetailsHistory.budgetType}</span>
                                <span>${this.props.dataObj.jobDetailsHistory.budgetAmount}.00</span>
                            </div>
                        </div>
                    </>}
            </>
        )
    }
}

export default connect(mapToPropsData, { getJobDetailsHistory, getClientReview })(withRouter(FreelancerWorkHistory))