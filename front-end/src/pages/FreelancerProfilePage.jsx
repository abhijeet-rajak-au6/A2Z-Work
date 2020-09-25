import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { mapToPropsData } from "../redux/mapStateToProps"
import { userLogout } from '../redux/actions/userAction'
import { getUserProfileData, downloadResume, getUserPortfolio, getEmploymentHistory } from '../redux/actions/dataAction'
import FreelancerWorkHistory from '../components/FreelancerWorkHistory'
import { headerAuthorization } from '../axios'
import person_icon from '../img/person_icon.png'
import Spinner from '../components/common/Spinner'
import '../styles/FreelancerProfilePage.css'

const initialState = {
    userProfileMsg: "",
}
class FreelancerProfilePage extends Component {
    state = initialState
    async componentDidMount() {
        headerAuthorization()
        try {
            const response = await this.props.getUserProfileData()
            await this.props.getUserPortfolio()
            await this.props.getEmploymentHistory()
            this.setState({ userProfileMsg: response })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
            this.setState({ userProfileMsg: err })
        }
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
    handleCLickEditProfile = () => {
        this.props.history.push("/editFreelancerProfile")
    }
    handleClickAddPortfolio = () => {
        this.props.history.push("/editFreelancerMultipleProfileData")
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
                                            <h2>{this.props.dataObj.userProfile.userName} {this.props.dataObj.userProfile.resume ?
                                                <span className="resume-download" onClick={(event) => { downloadResume(this.props.dataObj.userProfile.resume) }}>
                                                    <i className="fas fa-user-check" style={{ color: "#28A745" }}></i>
                                                </span>
                                                : null}</h2>
                                            {this.props.dataObj.userProfile.title ?
                                                <h4>{this.props.dataObj.userProfile.title} <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></h4>
                                                : null}
                                            <h6>Hourly Rate : ${this.props.dataObj.userProfile.hourlyRate ? this.props.dataObj.userProfile.hourlyRate + ".00" : '00.00'}</h6>
                                            <h6>
                                                Availability : {this.props.dataObj.userProfile.availability ? this.props.dataObj.userProfile.availability : null}
                                            </h6>
                                            {this.props.dataObj.userProfile.freelancerDescription ? <p>{this.props.dataObj.userProfile.freelancerDescription}</p> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="profile-main-button-container">
                                        <button onClick={this.handleCLickEditProfile} className="btn btn-success">
                                            Edit Profile
                                    </button>
                                        {this.props.dataObj.userProfile.isClient ?
                                            <button className="btn btn-success ml-5">
                                                Client Profile
                                    </button>
                                            : null}
                                        <button onClick={this.handleLogout} className="btn btn-danger ml-5">
                                            Logout
                                    </button>
                                    </div>
                                    <div className="money-balance-container">
                                        <h6>Balance : </h6>
                                        <p className="px-3 mr-auto">Your balance is <b>${this.props.dataObj.userProfile.freelancerCurrentBalance ? this.props.dataObj.userProfile.freelancerCurrentBalance : "00"}.00</b></p>
                                        {this.props.dataObj.userProfile.freelancerCurrentBalance ? <button className="btn btn-success">Get Paid Now</button> : null}
                                    </div>
                                    <div className="work-details-container">
                                        <div className="text-center">
                                            <h6>${this.props.dataObj.userProfile.totalEarning ? this.props.dataObj.userProfile.totalEarning + `+` : "00.00"}</h6>
                                            <p>Total Earnings</p>
                                        </div>
                                        <div className="text-center px-5">
                                            <h6>{this.props.dataObj.userProfile.workHistory.length ? this.props.dataObj.userProfile.workHistory.length : "00"}</h6>
                                            <p>Total Jobs</p>
                                        </div>
                                        <div className="text-center">
                                            <h6>{this.props.dataObj.userProfile.freelancerTotalJobHours ? this.props.dataObj.userProfile.freelancerTotalJobHours : "00"}</h6>
                                            <p>Total Hours</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col specialization-container mb-3">
                                    <div className="language-title">
                                        <h4>Specialization : </h4>
                                        <button className="btn btn-success btn-sm">Add</button>
                                    </div>
                                    {this.props.dataObj.userProfile.specialization.length ?
                                        this.props.dataObj.userProfile.specialization.map((specialization, index) =>
                                            <>
                                                <h6 key={specialization._id} className="mt-3">{index + 1}. {specialization.specializationTitle} : <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span><span className="delete-box"><i className="fas fa-trash-alt"></i>
                                                </span></h6>

                                                <div className="specialization-skill-container mt-3">
                                                    <span className="ml-4"><b>Skills : </b></span>
                                                    {specialization.specializationSkills.map((skill, index) =>
                                                        <span key={index} className="skill-text">{skill}</span>)}
                                                </div>
                                            </>
                                        )
                                        : <div className="employment-history-container">
                                            <h6>No content available</h6>
                                        </div>}
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col-5">
                                    <div className="language-title">
                                        <h4>Languages : <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></h4>
                                        <button className="btn btn-success btn-sm">Add</button>
                                    </div>
                                    {this.props.dataObj.userProfile.languages.length ?
                                        <div className="language-container-main">
                                            {this.props.dataObj.userProfile.languages.map(language =>
                                                <div className="language">
                                                    <h6>{language.medium} : </h6>
                                                    <p className="px-3">{language.fluency}</p>
                                                </div>
                                            )}
                                        </div>
                                        : <div className="employment-history-container">
                                            <h6>No content available</h6>
                                        </div>}
                                </div>
                                <div className="col-7">
                                    <div className="language-title">
                                        <h4>Education : </h4>
                                        <button className="btn btn-success btn-sm">Add</button>
                                    </div>
                                    {this.props.dataObj.userProfile.education.length ?
                                        <div className="education-main-container">
                                            {this.props.dataObj.userProfile.education.map((education, index) =>
                                                <>
                                                    <div className="education">
                                                        <h6>{index + 1}. College or University : </h6>
                                                        <p className="px-3">{education.collegeName} <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span><span className="delete-box"><i className="fas fa-trash-alt"></i>
                                                        </span></p>
                                                    </div>
                                                    <div className="education-details">
                                                        <h6>Degree : </h6>
                                                        <p className="px-3">{education.degree}</p>
                                                    </div>
                                                    <div className="education-details">
                                                        <h6>Course year : </h6>
                                                        <p className="px-3">{education.startingYear} to {education.passoutYear}</p>
                                                    </div>
                                                </>)}
                                        </div>
                                        : <div className="employment-history-container">
                                            <h6>No content available</h6>
                                        </div>}
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col-6">
                                    <div className="project-details">
                                        <h6>Project preferences : </h6>
                                        <p className="px-3">{this.props.dataObj.userProfile.projectPreference ? this.props.dataObj.userProfile.projectPreference : null}<span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></p>
                                    </div>
                                    <div className="project-details">
                                        <h6>Experience Level : </h6>
                                        <p className="pl-3">{this.props.dataObj.userProfile.experienceLevel ? this.props.dataObj.userProfile.experienceLevel : null}<span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></p>
                                    </div>
                                    <div className="project-details">
                                        <h6>Category : </h6>
                                        <p className="pl-3">{this.props.dataObj.userProfile.category ? this.props.dataObj.userProfile.category : null} <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h4>Skills : <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></h4>
                                    {this.props.dataObj.userProfile.skills.length ?
                                        <div className="specialization-skill-container mt-3 mb-3">
                                            {this.props.dataObj.userProfile.skills.map((skill, index) =>
                                                <span key={index} className="skill-text">{skill}</span>)}
                                        </div>
                                        : <div className="employment-history-container">
                                            <h6>No content available</h6>
                                        </div>}
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col-5">
                                    <div className="project-details">
                                        <h6>PAN No : </h6>
                                        <p className="px-3">{this.props.dataObj.userProfile.panNo ? this.props.dataObj.userProfile.panNo : null}</p>
                                    </div>
                                    <div className="project-details">
                                        <h6>Adhar No : </h6>
                                        <p className="px-3">{this.props.dataObj.userProfile.addharNo ? this.props.dataObj.userProfile.addharNo : null}</p>
                                    </div>
                                    <div className="project-details">
                                        <h6>GSTIN : </h6>
                                        <p className="px-3">{this.props.dataObj.userProfile.GSTIN ? this.props.dataObj.userProfile.GSTIN : null}</p>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <h4>Contact Info : <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span></h4>
                                    {this.props.dataObj.userProfile.address ?
                                        <>
                                            <div className="language mt-3">
                                                <h6>Address : </h6>
                                                <p className="px-3">{this.props.dataObj.userProfile.address.city}, {this.props.dataObj.userProfile.address.state},{this.props.dataObj.userProfile.address.country}, {this.props.dataObj.userProfile.address.pinNo} </p>
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
                                    <h4>Work history : </h4>
                                    {this.props.dataObj.userProfile.workHistory.length ?
                                        this.props.dataObj.userProfile.workHistory.map((job, index) =>
                                            <FreelancerWorkHistory key={job} index={index} jobId={job} />)
                                        : <div className="work-history-container">
                                            <h6>No Work History available</h6>
                                        </div>}

                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col">
                                    <div className="language-title">
                                        <h4>Portfolio : </h4>
                                        <button onClick={this.handleClickAddPortfolio} className="btn btn-success btn-sm">Add</button>
                                    </div>
                                    {this.props.dataObj.userProfile.userPortfolio.length ?
                                        <div className="portfolio-data-container m-3">
                                            {this.props.dataObj.userProfile.userPortfolio.map(portfolio =>
                                                <div key={portfolio._id} className="card" style={{ width: "18rem", marginRight: "10px" }}>
                                                    <a href={portfolio.portfolioLink} target="_blank" rel="noopener noreferrer"><img className="card-img-top" src={portfolio.image} alt="portfolio" height="200" width="100%" /></a>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{portfolio.portfolioTitle} <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span><span className="delete-box"><i className="fas fa-trash-alt"></i>
                                                        </span></h5>
                                                        <p className="card-text">{portfolio.overview}</p>
                                                    </div>
                                                </div>)}
                                        </div> :
                                        <div className="portfolio-container">
                                            <h6>Showcase your work to win more projects</h6>
                                            <p>Add items to impress clients</p>
                                        </div>}
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col">
                                    <div className="language-title">
                                        <h4>Employment history : </h4>
                                        <button onClick={this.handleClickAddPortfolio} className="btn btn-success btn-sm">Add</button>
                                    </div>
                                    {this.props.dataObj.userProfile.empHistory.length ?
                                        <div className="employment-history-data-container my-3">
                                            {this.props.dataObj.userProfile.empHistory.map((empHistory, index) =>
                                                <div key={empHistory._id} className="employment-history-data">
                                                    <h6>{index + 1}. {empHistory.jobTitle} | <a href={empHistory.companyWebsite}>{empHistory.companyName}</a> <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span><span className="delete-box"><i className="fas fa-trash-alt"></i>
                                                    </span></h6>
                                                    <p className="ml-4">{empHistory.jobDescription}</p>
                                                    <p className="ml-3"><b>Duration :  </b> {empHistory.startingYear} to {empHistory.endingYear}</p>
                                                </div>)}
                                        </div>
                                        : <div className="employment-history-container">
                                            <h6>No content available</h6>
                                        </div>}
                                </div>
                            </div>
                            <div className="row profile-view-container mt-3">
                                <div className="col">
                                    <div className="language-title">
                                        <h4>Other Experiences : </h4>
                                        <button onClick={this.handleClickAddPortfolio} className="btn btn-success btn-sm">Add</button>
                                    </div>
                                    {this.props.dataObj.userProfile.empHistory.length ? <div className="other-experience-container my-2">
                                        {this.props.dataObj.userProfile.empHistory[0].otherExperience ?

                                            this.props.dataObj.userProfile.empHistory[0].otherExperience.otherExperience.map((experience, index) =>
                                                <div className="other-experience-data">
                                                    <h5>{index + 1}. {experience.title} <span className="edit-pencil"><i className="fas fa-pencil-alt"></i></span><span className="delete-box"><i className="fas fa-trash-alt"></i>
                                                    </span></h5>
                                                    <p className="ml-4">{experience.description}</p>
                                                </div>
                                            )

                                            : <div className="employment-history-container">
                                                <h6>No content available</h6>
                                            </div>}
                                    </div>
                                        : <div className="employment-history-container">
                                            <h6>No content available</h6>
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
                                        <button className="btn btn-success btn-lg mr-5">Create a client account</button>
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

export default connect(mapToPropsData, { userLogout, getUserProfileData, getUserPortfolio, getEmploymentHistory })(FreelancerProfilePage)