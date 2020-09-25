import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { mapToPropsData } from "../redux/mapStateToProps"
import { userLogout } from '../redux/actions/userAction'
import { getUserProfileData } from '../redux/actions/dataAction'
import { headerAuthorization } from '../axios'
import person_icon from '../img/person_icon.png'
import Spinner from '../components/common/Spinner'
import WorkHistory from '../components/WorkHistory'
import '../styles/ClientProfilePage.css'

const initialState = {
    userProfileMsg: "",
}

class ClientProfilePage extends Component {
    state = initialState
    async componentDidMount() {
        headerAuthorization()
        try {
            const response = await this.props.getUserProfileData()
            this.setState({ userProfileMsg: response })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
            this.setState({ userProfileMsg: err })
        }
    }
    handleClickEditProfile = () => {
        this.props.history.push("/editClientProfile")
    }
    handleLogout = async () => {
        try {
            const response = await this.props.userLogout()
            Swal.fire({
                icon: 'success',
                title: `${response}`
            })
            this.props.history.push("/login")
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
                {this.state.userProfileMsg ?
                    <div className="row">
                        <div className="col">
                            <div className="row profile-view-container mt-5">
                                <div className="col-5">
                                    <div className="profile-main-container">
                                        <div className="profile-img-container">
                                            <div className="profile-img-edit-pencil"><i className="fas fa-pencil-alt"></i>
                                            </div>
                                            <img src={this.props.dataObj.userProfile.profileImage ? this.props.dataObj.userProfile.profileImage : ""} alt="profile" onError={(e) => { e.target.onerror = null; e.target.src = `${person_icon}`; }} className="profile-img" width="100" height="100" />
                                        </div>
                                        <div className="profile-description">
                                            <h2>{this.props.dataObj.userProfile.userName} {this.props.dataObj.userProfile.companyLink ?
                                                <a href={this.props.dataObj.userProfile.companyLink} target="_blank" rel="noopener noreferrer">
                                                    <i className="fas fa-user-check" style={{ color: "#28A745" }}></i>
                                                </a>
                                                : null}</h2>
                                            <h4>Company : {this.props.dataObj.userProfile.companyName && this.props.dataObj.userProfile.companyName} <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></h4>
                                            <h6>Website : {this.props.dataObj.userProfile.companyLink && <a href={this.props.dataObj.userProfile.companyLink} target="_blank" rel="noopener noreferrer">{this.props.dataObj.userProfile.companyLink}</a>}</h6>
                                            <h6>Tagline : {this.props.dataObj.userProfile.tagLine && this.props.dataObj.userProfile.tagLine}</h6>
                                            <p>{this.props.dataObj.userProfile.companyDescription && this.props.dataObj.userProfile.companyDescription}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="profile-main-button-container">
                                        <button onClick={this.handleClickEditProfile} className="btn btn-success ml-5">
                                            Edit Profile
                                        </button>
                                        {this.props.dataObj.userProfile.isFreelancer &&
                                            <button className="btn btn-success">
                                                Freelancer Profile
                                    </button>}
                                        <button onClick={this.handleLogout} className="btn btn-danger ml-5">
                                            Logout
                                    </button>
                                    </div>
                                    <div className="client-money-balance-container">
                                        <h6>Balance : </h6>
                                        <p className="px-3 mr-auto">Your current due balance is <b>${this.props.dataObj.userProfile.clientCurrentBalance ? this.props.dataObj.userProfile.clientCurrentBalance + ".00" : "00.00"}</b></p>
                                        <button className="btn btn-success">Add money</button>
                                    </div>
                                    <div className="work-details-container">
                                        <div className="text-center">
                                            <h6>${this.props.dataObj.userProfile.totalSpending ? this.props.dataObj.userProfile.totalSpending + `+` : "00.00"}</h6>
                                            <p>Total Spendings</p>
                                        </div>
                                        <div className="text-center px-5">
                                            <h6>{this.props.dataObj.userProfile.jobDone ? this.props.dataObj.userProfile.jobDone.length : "00"}</h6>
                                            <p>Total Jobs</p>
                                        </div>
                                        <div className="text-center">
                                            <h6>{this.props.dataObj.userProfile.clientTotalJobHours ? this.props.dataObj.userProfile.clientTotalJobHours : "00"}</h6>
                                            <p>Total Hours</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col-5">
                                    <div className="project-details">
                                        <h6>PAN No : </h6>
                                        <p className="px-3">{this.props.dataObj.userProfile.panNo && this.props.dataObj.userProfile.panNo}</p>
                                    </div>
                                    <div className="project-details">
                                        <h6>GSTIN : </h6>
                                        <p className="px-3">{this.props.dataObj.userProfile.GSTIN && this.props.dataObj.userProfile.GSTIN}</p>
                                    </div>
                                    <div className="project-details">
                                        <h6>VAT ID : </h6>
                                        <p className="px-3">{this.props.dataObj.userProfile.vatId && this.props.dataObj.userProfile.vatId}</p>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <h4>Company contact : <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></h4>
                                    <div className="language mt-3">
                                        <h6>Owner : </h6>
                                        <p className="px-3">{this.props.dataObj.userProfile.companyOwnerName && this.props.dataObj.userProfile.companyOwnerName}</p>
                                    </div>
                                    {this.props.dataObj.userProfile.companyContactDetails ?
                                        <>
                                            <div className="language">
                                                <h6>Address : </h6>
                                                <p className="px-3">{this.props.dataObj.userProfile.companyContactDetails.city}, {this.props.dataObj.userProfile.companyContactDetails.state},{this.props.dataObj.userProfile.companyContactDetails.country}, {this.props.dataObj.userProfile.companyContactDetails.pinNo} </p>
                                            </div>
                                            {this.props.dataObj.userProfile.phoneNo && <div className="language">
                                                <h6>Ph no : </h6>
                                                <p className="px-3">{this.props.dataObj.userProfile.phoneNo}</p>
                                            </div>}
                                        </>
                                        : <div className="employment-history-container">
                                            <h6>No content available</h6>
                                        </div>}
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col">
                                    <h4>Job history : </h4>
                                    {this.props.dataObj.userProfile.jobDone.length ?
                                        this.props.dataObj.userProfile.jobDone.map((job, index) => <WorkHistory key={job} jobId={job} index={index} />) :
                                        <div className="work-history-container">
                                            <h6>No Job History available</h6>
                                        </div>}
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col password-security">
                                    <h4>Password & security : </h4>
                                    <div className="change-password-container my-3">
                                        <h6>Change Password : </h6>
                                        <p className="px-3 mr-auto">Choose a strong, unique password that’s at least 6 characters long.</p>
                                        <button className="btn btn-success btn-sm">Change</button>
                                    </div>
                                    <div className="change-password-container">
                                        <h6>Two-step authentication : </h6>
                                        <p className="px-3 mr-auto">Receive a six digit code by text message to enter along with your password.</p>
                                        <button className="btn btn-success btn-sm">Enable</button>
                                    </div>
                                    <div className="profile-security">
                                        <button className="btn btn-success btn-lg mr-5">Create a freelancer account</button>
                                        <button className="btn btn-danger btn-lg">Close account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Spinner />}
            </div>
        )
    }
}

export default connect(mapToPropsData, { userLogout, getUserProfileData })(ClientProfilePage)





