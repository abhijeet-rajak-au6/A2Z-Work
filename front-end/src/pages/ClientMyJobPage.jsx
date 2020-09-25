import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { mergeStateToProps } from '../redux/mapStateToProps'
import { getClientAllPostedJobs } from '../redux/actions/dataAction'
import ClientJobs from '../components/ClientJobs'
import { headerAuthorization } from '../axios'
import Spinner from '../components/common/Spinner'
import '../styles/MyJobPage.css'

const initialState = {
    allClientJobs: "",
}

class ClientMyJobPage extends Component {
    state = initialState
    async componentDidMount() {
        headerAuthorization()
        try {
            const response = await this.props.getClientAllPostedJobs()
            this.setState({ allClientJobs: response })
        } catch (err) {
            this.setState({ allClientJobs: err })
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }

    handleClickPostJobPage = () => {
        if (this.props.userObj.user.acceptTermsCondition) {
            this.props.history.push("/jobPost")
        } else {
            this.props.history.push("/editClientProfile")
        }
    }

    render() {
        return (
            <div className="container">
                <div className="my-job-header">
                    <h2>Company : {this.props.userObj.user.companyName}</h2>
                    <button onClick={this.handleClickPostJobPage} className="btn btn-success">Post a Job</button>
                    {this.props.userObj.user.isFreelancer && <button className="btn btn-success">Freelancer profile jobs</button>}
                </div>
                {this.state.allClientJobs ?
                    <>
                        <div className="Posted-job-Container">
                            <h4>Current posted jobs : </h4>
                            {this.props.dataObj.allClientJobs.openJob.length ?
                                this.props.dataObj.allClientJobs.openJob.map((job, index) => <>
                                    <ClientJobs key={job._id} index={index} job={job} />
                                </>)
                                : <div className="job-content-container">
                                    <h6>No job posted yet</h6>
                                </div>}
                        </div>
                        <div className="ongoing-project-container">
                            <h4>Ongoing Projects : </h4>
                            {this.props.dataObj.allClientJobs.onGoingJob.length ?
                                this.props.dataObj.allClientJobs.onGoingJob.map((job, index) => <ClientJobs key={job._id} index={index} job={job} />)
                                : <div className="job-content-container">
                                    <h6>No content available</h6>
                                </div>}
                        </div>
                        <div className="job-history-container">
                            <h4>Job history : </h4>
                            {this.props.dataObj.allClientJobs.closedJob.length ?
                                this.props.dataObj.allClientJobs.closedJob.map((job, index) => <ClientJobs key={job._id} index={index} job={job} />)
                                : <div className="job-content-container">
                                    <h6>No content available</h6>
                                </div>}
                        </div>
                    </>
                    : <Spinner />}
            </div>
        )
    }
}

export default connect(mergeStateToProps, { getClientAllPostedJobs })(ClientMyJobPage)