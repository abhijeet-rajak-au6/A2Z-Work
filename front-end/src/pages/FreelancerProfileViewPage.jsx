import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { getFreelancerProfileData, downloadResume } from '../redux/actions/dataAction'
import { mapToPropsData } from '../redux/mapStateToProps'
import person_icon from '../img/person_icon.png'
import Spinner from '../components/common/Spinner'
import FreelancerWorkHistory from '../components/FreelancerWorkHistory'
import '../styles/FreelancerProfilePage.css'

const initialState = {
    profileData: "",
}

class FreelancerProfileViewPage extends Component {
    state = initialState
    async componentDidMount() {
        try {
            const response = await this.props.getFreelancerProfileData(this.props.match.params.freelancerId)
            this.setState({ profileData: response })
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
                {this.state.profileData ?
                    <>
                        <div className="row">
                            <div className="col">
                                <div className="row profile-view-container mt-5">
                                    <div className="col-5">
                                        <div className="profile-main-container">
                                            <div className="profile-img-container">
                                                <img src={this.props.dataObj.userProfile.user.profileImage ? this.props.dataObj.userProfile.user.profileImage : ""} alt="profile" onError={(e) => { e.target.onerror = null; e.target.src = `${person_icon}`; }} className="profile-img" width="100" height="100" />
                                            </div>
                                            <div className="profile-description">
                                                <h2>{this.props.dataObj.userProfile.user.userName}

                                                    <span className="resume-download px-3">
                                                        <i className="fas fa-user-check" style={{ color: "#28A745" }}></i>
                                                    </span>
                                                </h2>
                                                <h4>{this.props.dataObj.userProfile.user.title}</h4>
                                                <h6>Hourly Rate : ${this.props.dataObj.userProfile.user.hourlyRate}.00</h6>
                                                <h6>
                                                    Availability :{this.props.dataObj.userProfile.user.availability}
                                                </h6>
                                                <p>{this.props.dataObj.userProfile.user.freelancerDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="profile-main-button-container">
                                            <button onClick={(event) => { downloadResume(this.props.dataObj.userProfile.user.resume) }} className="btn btn-success">
                                                Download CV
                                            </button>
                                        </div>
                                        <div className="work-details-container">
                                            <div className="text-center">
                                                <h6>${this.props.dataObj.userProfile.user.totalEarnings ? this.props.dataObj.userProfile.user.totalEarnings + "+" : "00"}.00</h6>
                                                <p>Total Earnings</p>
                                            </div>
                                            <div className="text-center px-5">
                                                <h6>{this.props.dataObj.userProfile.user.workHistory.length}</h6>
                                                <p>Total Jobs</p>
                                            </div>
                                            <div className="text-center">
                                                <h6>{this.props.dataObj.userProfile.user.freelancerTotalJobHours ?
                                                    this.props.dataObj.userProfile.user.freelancerTotalJobHours
                                                    : "00"}</h6>
                                                <p>Total Hours</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row profile-view-container mt-3">
                                    <div className="col specialization-container">
                                        <div className="language-title">
                                            <h4>Specialization : </h4>
                                        </div>
                                        {this.props.dataObj.userProfile.user.specialization.length ?
                                            this.props.dataObj.userProfile.user.specialization.map((specialization, index) =>
                                                <>
                                                    <h6 key={specialization._id} className="mt-3">{index + 1}. {specialization.specializationTitle} : </h6>

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
                                            <h4>Languages : </h4>
                                        </div>
                                        {this.props.dataObj.userProfile.user.languages.length ?
                                            <div className="language-container-main">
                                                {this.props.dataObj.userProfile.user.languages.map(language =>
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
                                        </div>
                                        {this.props.dataObj.userProfile.user.education.length ?
                                            <div className="education-main-container">
                                                {this.props.dataObj.userProfile.user.education.map((education, index) =>
                                                    <>
                                                        <div className="education">
                                                            <h6>{index + 1}. College or University : </h6>
                                                            <p className="px-3">{education.collegeName}</p>
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
                                    <div className="col-5">
                                        <div className="project-details">
                                            <h6>Project preferences : </h6>
                                            <p className="px-3">{this.props.dataObj.userProfile.user.projectPreference}</p>
                                        </div>
                                        <div className="project-details">
                                            <h6>Experience Level : </h6>
                                            <p className="pl-3">{this.props.dataObj.userProfile.user.experienceLevel}</p>
                                        </div>
                                        <div className="project-details">
                                            <h6>Category : </h6>
                                            <p className="pl-3">{this.props.dataObj.userProfile.user.category}</p>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <h4>Skills : </h4>
                                        <div className="specialization-skill-container mt-3 mb-3">
                                            {this.props.dataObj.userProfile.user.skills.map((skill, index) =>
                                                <span key={index} className="skill-text">{skill}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="row profile-view-container mt-3">
                                    <div className="col">
                                        <h4>Work history : </h4>
                                        {this.props.dataObj.userProfile.user.workHistory.length ?
                                            this.props.dataObj.userProfile.user.workHistory.map((job, index) =>
                                                <FreelancerWorkHistory key={job} index={index} jobId={job} />)
                                            : <div className="work-history-container">
                                                <h6>No Work History available</h6>
                                            </div>}
                                    </div>
                                </div>
                                <div className="row profile-view-container mt-3">
                                    <div className="col">
                                        <h4>Portfolio : </h4>

                                        {this.props.dataObj.userProfile.portfolio.length ?
                                            <div className="portfolio-data-container m-3">
                                                {this.props.dataObj.userProfile.portfolio.map(portfolio =>
                                                    <div key={portfolio._id} className="card" style={{ width: "18rem", marginRight: "10px" }}>
                                                        <a href={portfolio.portfolioLink} target="_blank" rel="noopener noreferrer"><img className="card-img-top" src={portfolio.image} alt="portfolio" height="200" width="100%" /></a>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{portfolio.portfolioTitle}</h5>
                                                            <p className="card-text">{portfolio.overview}</p>
                                                        </div>
                                                    </div>)}
                                            </div> :
                                            <div className="employment-history-container">
                                                <h6>No content available</h6>
                                            </div>}

                                    </div>
                                </div>
                                <div className="row profile-view-container mt-3">
                                    <div className="col">
                                        <div className="language-title">
                                            <h4>Employment history : </h4>
                                        </div>

                                        {this.props.dataObj.userProfile.employmentHistory.length ?
                                            <div className="employment-history-data-container my-3">
                                                {this.props.dataObj.userProfile.employmentHistory.map((empHistory, index) =>
                                                    <div key={empHistory._id} className="employment-history-data">
                                                        <h6>{index + 1}. {empHistory.jobTitle} | <a href={empHistory.companyWebsite}>{empHistory.companyName}</a></h6>
                                                        <p className="ml-4">{empHistory.jobDescription}</p>
                                                        <p className="ml-3"><b>Duration :  </b> {empHistory.startingYear} to {empHistory.endingYear}</p>
                                                    </div>)}
                                            </div> :
                                            <div className="employment-history-container">
                                                <h6>No content available</h6>
                                            </div>}

                                    </div>
                                </div>
                                <div className="row profile-view-container mt-3">
                                    <div className="col">
                                        <div className="language-title">
                                            <h4>Other Experiences : </h4>
                                        </div>
                                        {this.props.dataObj.userProfile.employmentHistory.length ? <div className="other-experience-container my-2">
                                            {this.props.dataObj.userProfile.employmentHistory[0].otherExperience ?

                                                this.props.dataObj.userProfile.employmentHistory[0].otherExperience.otherExperience.map((experience, index) =>
                                                    <div className="other-experience-data">
                                                        <h5>{index + 1}. {experience.title}</h5>
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
                            </div>
                        </div>
                    </>
                    : <Spinner />}
            </div>
        )
    }
}

export default connect(mapToPropsData, { getFreelancerProfileData, downloadResume })(FreelancerProfileViewPage)