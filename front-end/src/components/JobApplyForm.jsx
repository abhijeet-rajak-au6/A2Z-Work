import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { applyJob } from '../redux/actions/dataAction'
import pre_loader from '../img/pre_loader.svg';
import '../styles/JobDetailsPage.css'

const initialState = {
    coverLetter: '',
    jobApplied: "",
    pre_loader: "none",
    submit_button: "block"
}

class JobApplyForm extends Component {
    state = initialState
    handleChangeJobApply = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitJobApply = async (event) => {
        event.preventDefault()
        const coverLetter = {
            coverLetter: this.state.coverLetter,
        }
        try {
            const response = await this.props.applyJob(this.props.jobId, coverLetter)
            this.setState({ jobApplied: response })
            Swal.fire({
                icon: 'success',
                title: `${response}`
            })
            this.props.jobApply()
        } catch (err) {
            this.setState(initialState)
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }

    }
    handleClickCancelJobApply = () => {
        this.props.jobApply()
    }
    componentWillUnmount() {
        this.setState(initialState)
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmitJobApply}>
                    <div className="row">
                        <div className="col-12">
                            <h4>Cover Letter : </h4>
                            <textarea onChange={this.handleChangeJobApply} id="coverLetter" name="coverLetter" className="input-cover-letter" placeholder="Use this space to show client you have the skills and experience for this job.Keep it short and make sure it's error-free...." value={this.state.coverLetter} required></textarea>
                            <div className="pre-loader">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                            </div>
                            <div className="submit-button" style={{ display: this.state.submit_button }}>
                                <input type="submit" className="btn btn-success mr-3" value="Submit" />
                                <button onClick={this.handleClickCancelJobApply} className="btn btn-warning">Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default connect(null, { applyJob })(JobApplyForm)