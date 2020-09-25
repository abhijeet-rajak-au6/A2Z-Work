import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import JobApplyForm from '../components/JobApplyForm'
import { getJobDetails, downloadResume } from '../redux/actions/dataAction'
import { mergeStateToProps } from '../redux/mapStateToProps'
import { headerAuthorization } from '../axios'
import Spinner from '../components/common/Spinner'
import JobDetailsWorkHistory from '../components/JobDetailsWorkHistory'
import '../styles/JobDetailsPage.css'

const initialState = {
    starRating: "",
    jobApply: "none",
    jobDetails: "",
}

class JobDetailsPage extends Component {
    state = initialState
    async componentDidMount() {
        headerAuthorization()
        try {
            const response = await this.props.getJobDetails(this.props.match.params.jobId)
            this.setState({ jobDetails: response })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.jobDetails !== this.state.jobDetails) {
            (() => {
                const clientRatings = this.props.dataObj.jobDetails.user.clientAverageRating || 0
                const starPercentage = (clientRatings / 5) * 100;

                // Round to nearest 10
                const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

                // Set width of stars-inner to percentage
                this.setState({ starRating: starPercentageRounded })
            })()
        }
    }
    handleClickSubmitProposal = () => {
        if (this.props.userObj.user.acceptTermsCondition) {
            this.setState({ jobApply: "block" })
        } else {
            this.props.history.push("/editFreelancerProfile")
        }

    }
    cancelJobApply = () => {
        this.setState({ jobApply: "none" })
    }
    handleClickJobPostPage = () => {
        this.props.history.push("/jobPost")
    }
    render() {
        return (
            <div className="container mt-5">
                {this.state.jobDetails ?
                    <>
                        <div className="job-details-container">
                            <div className="row">
                                <div className="col-9 border-right">
                                    <h4>{this.props.dataObj.jobDetails.jobTitle}</h4>
                                    <h6>Category : {this.props.dataObj.jobDetails.category}</h6>
                                    <p>{this.props.dataObj.jobDetails.jobDescription}</p>
                                    <h6>Project type : {this.props.dataObj.jobDetails.projectType}</h6>
                                    <h6>Project duration : {this.props.dataObj.jobDetails.projectDuration}</h6>
                                    <h6>Budget : {this.props.dataObj.jobDetails.budgetType}, ${this.props.dataObj.jobDetails.budgetAmount}.00</h6>
                                    <h6>Expert required : {this.props.dataObj.jobDetails.expertiseLevel}</h6>
                                    <h6>No of freelabcer required : {this.props.dataObj.jobDetails.freelancerNo}</h6>
                                    <h6>Project files : {this.props.dataObj.jobDetails.projectFile.map((file, index) =>
                                        <span key={index + 1} onClick={(event) => { downloadResume(file) }} className="project-file">File {index + 1}</span>
                                    )}
                                    </h6>
                                    <h6>Skills required : </h6>
                                    {this.props.dataObj.jobDetails.skills.map((skill, index) => <span key={index + 1} className="skill-text-job">{skill}</span>)}

                                </div>
                                <div className="col-3">
                                    <div className="job-client-details-container">
                                        {this.props.dataObj.jobDetails.jobStatus === "completed" ? <h6>This job is no more available</h6> :
                                            <div className="project-button-container border-bottom pb-3">
                                                {this.props.userObj.user.isFreelancer ? <>
                                                    <button onClick={this.handleClickSubmitProposal} className="btn btn-success mb-4">Submit a Proposal</button>
                                                    <button className="btn btn-warning"><i className="fa fa-heart px-3" aria-hidden="true"></i>Save Job</button>
                                                </> :
                                                    <button onClick={this.handleClickJobPostPage} className="btn btn-success">Post a Job like this</button>}

                                            </div>}

                                        <div className="client-details mt-3">
                                            <h5>About the client</h5>
                                            <h6>Company : {this.props.dataObj.jobDetails.user.companyName}</h6>
                                            <h6 className="mt-3">{this.props.dataObj.jobDetails.user.clientCurrentBalance ?
                                                <>
                                                    <i style={{ color: "#DDD110" }} className="fas fa-check-circle mr-3"></i> Payment verified
                                                </> : <>
                                                    <i className="fas fa-check-circle mr-3"></i> Payment unverified
                                                </>}</h6>
                                            <div className="stars-outer">
                                                <div className="stars-inner" style={{ width: this.state.starRating }}></div>
                                            </div>
                                            {this.props.dataObj.jobDetails.user.clientAverageRating ? <span className="number-rating px-3">{this.props.dataObj.jobDetails.user.clientAverageRating} of {this.props.dataObj.jobDetails.user.jobDone.length} reviews</span> : <span className="number-rating px-3"> 0 of 0 reviews</span>}
                                            <h6 className="mt-3">Location : {this.props.dataObj.jobDetails.user.companyContactDetails.state}, {this.props.dataObj.jobDetails.user.companyContactDetails.country}</h6>
                                            <h6 className="mt-3">{this.props.dataObj.jobDetails.user.jobDone.length} Job completed</h6>
                                            <h6 className="mt-3">Total ${this.props.dataObj.jobDetails.user.totalSpending}+ spent</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="job-details-container mt-4" style={{ display: this.state.jobApply }}>
                            <JobApplyForm jobId={this.props.match.params.jobId} jobApply={this.cancelJobApply} />
                        </div>
                        <div className="job-details-container mt-4">
                            <h4>Client's Job history({this.props.dataObj.jobDetails.user.jobDone.length})</h4>
                            {this.props.dataObj.jobDetails.user.jobDone.length ?
                                this.props.dataObj.jobDetails.user.jobDone.map((job, index) => <JobDetailsWorkHistory key={job} index={index} jobId={job} />) :
                                <div className="client-job-history-container">
                                    <h6>No history available</h6>
                                </div>}

                        </div>
                    </>
                    : <Spinner />}
            </div>
        )
    }
}

export default connect(mergeStateToProps, { getJobDetails, downloadResume })(JobDetailsPage)

