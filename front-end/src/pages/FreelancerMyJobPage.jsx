import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { mergeStateToProps } from '../redux/mapStateToProps'
import { getFreelancerJobApplications } from '../redux/actions/dataAction'
import { headerAuthorization } from '../axios'
import FreelancerJobs from '../components/FreelancerJobs'
import Spinner from '../components/common/Spinner'
import '../styles/MyJobPage.css'

const initialState = {
    jobApplications: "",
}


class ClientMyJobPage extends Component {
    state = initialState
    async componentDidMount() {
        headerAuthorization()
        try {
            const response = await this.props.getFreelancerJobApplications()
            this.setState({ jobApplications: response })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }

    render() {
        return (
            <div className="container">
                {this.state.jobApplications ? <>
                    <div className="my-job-header">
                        <h2>Name : {this.props.userObj.user.userName}</h2>
                        {this.props.userObj.user.isClient && <button className="btn btn-success">Client profile jobs</button>}
                    </div>
                    <div className="Posted-job-Container">
                        <h4>Saved jobs : </h4>
                        <div className="job-content-container">
                            <h6>No job saved yet</h6>
                        </div>
                    </div>
                    <div className="Posted-job-Container">
                        <h4>Current applied jobs({this.props.dataObj.allJobApplications.appliedJobs.length}) : </h4>
                        {this.props.dataObj.allJobApplications.appliedJobs.length ?
                            this.props.dataObj.allJobApplications.appliedJobs.map((job, index) =>
                                <FreelancerJobs key={job._id} index={index} job={job.jobId} />)
                            : <div className="job-content-container">
                                <h6>No job applied yet</h6>
                            </div>}
                    </div>
                    <div className="ongoing-project-container">
                        <h4>Ongoing Projects({this.props.dataObj.allJobApplications.acceptedJobs.length}) : </h4>
                        {this.props.dataObj.allJobApplications.acceptedJobs.length ?
                            this.props.dataObj.allJobApplications.acceptedJobs.map((job, index) =>
                                <FreelancerJobs key={job._id} index={index} job={job.jobId} />)
                            : <div className="job-content-container">
                                <h6>No job accepted yet</h6>
                            </div>}

                    </div>
                    <div className="job-history-container">
                        <h4>Job history : </h4>
                        {this.props.dataObj.allJobApplications.completedJobs.length ?
                            this.props.dataObj.allJobApplications.completedJobs.map((job, index) =>
                                <FreelancerJobs key={job._id} index={index} job={job.jobId} />)
                            : <div className="job-content-container">
                                <h6>No job accepted yet</h6>
                            </div>}
                    </div>
                </> : <Spinner />}
            </div>
        )
    }
}

export default connect(mergeStateToProps, { getFreelancerJobApplications })(ClientMyJobPage)