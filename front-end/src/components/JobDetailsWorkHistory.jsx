import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { getJobDetailsHistory, getClientReview } from '../redux/actions/dataAction'
import { mapToPropsData } from '../redux/mapStateToProps'
import '../styles/JobFeedPage.css'


const initialState = {
    job: null,
    clientReview: null,
    clientStarRating: "",
    freelancerRatings: "",
}

class FreelancerWorkHistory extends Component {
    state = initialState

    async componentDidMount() {
        const jobId = this.props.jobId
        try {
            const response = await this.props.getJobDetailsHistory(jobId)
            const userId = this.props.dataObj.jobDetailsHistory.freelancerReview.freelancerId
            const clientReview = await this.props.getClientReview(jobId, userId)

            const clientRatings = this.props.dataObj.jobDetailsHistory.freelancerReview.ratings
            const starPercentage = (clientRatings / 5) * 100;

            // Round to nearest 10
            const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

            // Set width of stars-inner to percentage
            this.setState({ job: response, clientReview: clientReview, freelancerStarRating: starPercentageRounded })

        } catch (err) {
            console.log(err)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.clientReview !== this.state.clientReview) {
            (() => {
                const freelancerRatings = this.props.dataObj.clientReview.clientReview.clientReview.ratings
                const starPercentage = (freelancerRatings / 5) * 100;

                // Round to nearest 10
                const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

                // Set width of stars-inner to percentage
                this.setState({ clientStarRating: starPercentageRounded })
            })()
        }
    }

    render() {
        return (
            <>
                {
                    this.state.clientReview && <>
                        <div className="work-history-job border-bottom mb-3">
                            <div className="job-history-title">
                                <Link to={`/jobDetailsPage/${this.props.dataObj.jobDetailsHistory._id}`} target="_blank"><h4>{this.props.index + 1}. {this.props.dataObj.jobDetailsHistory.jobTitle}</h4></Link>

                            </div>
                            <div className="review-container">
                                <h6>To Freelancer :</h6>
                                <div className="stars-outer ml-3">
                                    <div className="stars-inner" style={{ width: this.state.clientStarRating }}></div>
                                </div>
                                <span className="number-rating px-3"> {this.props.dataObj.clientReview.clientReview.clientReview.ratings}</span>
                                <p className="mx-3">{this.props.dataObj.clientReview.clientReview.clientReview.feedback}</p>
                            </div>
                            <div className="review-container">
                                <h6>To Client :</h6>
                                <div className="stars-outer ml-3">
                                    <div className="stars-inner" style={{ width: this.state.freelancerStarRating }}></div>
                                </div>
                                <span className="number-rating px-3"> {this.props.dataObj.jobDetailsHistory.freelancerReview.ratings}</span>
                                <Link to={`/FreelancerProfileViewPage/${this.props.dataObj.clientReview.freelancerId}`}><h6 className="mx-3">{this.props.dataObj.clientReview.freelancer} : </h6></Link>
                                <p className="mx-3">{this.props.dataObj.jobDetailsHistory.freelancerReview.feedback}</p>
                            </div>
                        </div>
                    </>}
            </>
        )
    }
}

export default connect(mapToPropsData, { getJobDetailsHistory, getClientReview })(withRouter(FreelancerWorkHistory))