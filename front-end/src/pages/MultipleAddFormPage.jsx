import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { headerAuthorization } from '../axios'
import { addFreelancerPortfolioData, addFreelancerEmploymentHistory } from '../redux/actions/dataAction'
import pre_loader from '../img/pre_loader.svg';
import '../styles/MultipleAddFormPage.css'


const initialState = {
    pre_loader_1: "none",
    submit_button_1: "block",
    pre_loader_2: "none",
    submit_button_2: "block",
    pre_loader_3: "none",
    submit_button_3: "block",
    portfolioImage: "",
    portfolioTitle: "",
    portfolioDescription: "",
    portfolioLink: "",
    companyName: "",
    jobTitle: "",
    companyWebsite: "",
    jobDescription: "",
    startingYear: "",
    endingYear: "",
    experienceTitle: "",
    experienceDetails: "",


}

class MultipleAddFormPage extends Component {
    state = initialState
    componentDidMount() {
        headerAuthorization()
    }
    handleChangePortfolioInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleChangePortfolioImg = (event) => {
        this.setState({ portfolioImage: event.target.files[0] });
    }

    handleSubmitPortfolioData = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader_1: !this.state.pre_loader, submit_button_1: "none" })
        const formData = new FormData();
        try {
            formData.append("portfolioImage", this.state.portfolioImage);
            formData.append("portfolioTitle", this.state.portfolioTitle)
            formData.append("portfolioDescription", this.state.portfolioDescription)
            formData.append("portfolioLink", this.state.portfolioLink)
            const response = await this.props.addFreelancerPortfolioData(formData)
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            })
            this.setState(initialState)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
            this.setState(initialState)
        }
    }
    handleChangeEmploymentHistory = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitEmploymentHistory = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader_2: !this.state.pre_loader, submit_button_2: "none" })
        const employmentHistory = {
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            companyWebsite: this.state.companyWebsite,
            jobDescription: this.state.jobDescription,
            startingYear: this.state.startingYear,
            endingYear: this.state.endingYear,
        }
        try {
            const response = await this.props.addFreelancerEmploymentHistory(employmentHistory)
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            })
            this.setState(initialState)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
            this.setState(initialState)
        }
    }
    handleChangeOtherExperiences = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitOtherExperiences = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader_3: !this.state.pre_loader, submit_button_3: "none" })
        const otherExperiences = {
            experienceTitle: this.state.experienceTitle,
            experienceDetails: this.state.experienceDetails,
        }
        try {
            const response = await this.props.addFreelancerEmploymentHistory(otherExperiences)
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            })
            this.setState(initialState)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
            this.setState(initialState)
        }
    }

    render() {
        return (
            <div className="container">
                <div className="edit-profile-container">
                    <div className="form-info-header">
                        <h6>Please fill the fields below very carefully...all *fields are mandatory</h6>
                    </div>
                    <div className="form-category-container">
                        <h2 className="form-category-header">Portfolio</h2>
                        <form onSubmit={this.handleSubmitPortfolioData}>
                            <div className="file-upload-container">
                                <div className="img-upload mb-3">
                                    <label htmlFor="img-file">Portfolio Image* : </label>
                                    <input onChange={this.handleChangePortfolioImg} type="file" id="img-file" name="portfolioImage" className="file-upload-input" required />
                                </div>
                            </div>
                            <div className="profile-title-container">
                                <label htmlFor="title">Portfolio Title* : </label>
                                <input onChange={this.handleChangePortfolioInput} type="text" id="title" name="portfolioTitle" className="input-title" placeholder="Enter your portfolio title..." value={this.state.portfolioTitle} required />
                                <label htmlFor="website">Portfolio Link* : </label>
                                <input onChange={this.handleChangePortfolioInput} type="url" id="website" name="portfolioLink" className="input-portfolio-link" placeholder="Enter your portfolio related link..." value={this.state.portfolioLink} required />
                                <div className="row mt-3">
                                    <label htmlFor="description" className="ml-3">Overview* : </label>
                                    <textarea onChange={this.handleChangePortfolioInput} id="description" name="portfolioDescription" className="input-portfolio-description" placeholder="Enter a short description about your portfolio..." value={this.state.portfolioDescription} required></textarea>
                                </div>
                            </div>
                            <div className="pre-loader">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader_1 }} />
                            </div>
                            <div className="submit-profile-info" style={{ display: this.state.submit_button_1 }}>
                                <input type="submit" className="profile-info-submit-btn" value="Add Portfolio" />
                            </div>
                        </form>
                    </div>
                    <div className="form-category-container">
                        <h2 className="form-category-header">Employment History</h2>
                        <form onSubmit={this.handleSubmitEmploymentHistory}>
                            <div className="profile-title-container">
                                <label htmlFor="companyName">Company Name* : </label>
                                <input onChange={this.handleChangeEmploymentHistory} type="text" id="companyName" name="companyName" className="input-title" placeholder="Enter your company name..." value={this.state.companyName} required />
                                <label htmlFor="owner">Job Title* : </label>
                                <input onChange={this.handleChangeEmploymentHistory} type="text" id="owner" name="jobTitle" className="input-job-title" placeholder="Enter your job position..." value={this.state.jobTitle} required />
                                <label htmlFor="companyWebsite">Website* : </label>
                                <input onChange={this.handleChangeEmploymentHistory} type="url" id="companyWebsite" name="companyWebsite" className="input-website" placeholder="Enter your company website link..." value={this.state.companyWebsite} required />
                                <div className="row mt-3">
                                    <label htmlFor="jobDescription" className="ml-3">Overview* : </label>
                                    <textarea onChange={this.handleChangeEmploymentHistory} id="jobDescription" name="jobDescription" className="input-description mb-3" placeholder="Enter a short description about your job..." value={this.state.jobDescription} required></textarea>
                                </div>
                                <label htmlFor="date-attended">Employment Date* : </label>
                                <input onChange={this.handleChangeEmploymentHistory} type="date" id="date-attended" className="date-input-from" name="startingYear" max="2019-12-31" value={this.state.startingYear} />
                                <label style={{ fontSize: "18px" }} htmlFor="date-ended">to</label>
                                <input onChange={this.handleChangeEmploymentHistory} type="date" id="date-ended"
                                    className="date-input-to" name="endingYear" max="2024-12-31" value={this.state.endingYear} />
                            </div>
                            <div className="pre-loader">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader_2 }} />
                            </div>
                            <div className="submit-profile-info" style={{ display: this.state.submit_button_2 }}>
                                <input type="submit" className="profile-info-submit-btn" value="Add Employment History" />
                            </div>
                        </form>
                    </div>
                    <div className="form-category-container">
                        <h2 className="form-category-header">Other Experience</h2>
                        <form onSubmit={this.handleSubmitOtherExperiences}>
                            <div className="profile-title-container">
                                <label htmlFor="experienceTitle">Title* : </label>
                                <input onChange={this.handleChangeOtherExperiences} type="text" id="experienceTitle" name="experienceTitle" className="input-job-title" placeholder="Enter your experience title..." value={this.state.experienceTitle} required />
                                <div className="row mt-3">
                                    <label htmlFor="experienceDetails" className="ml-3">Overview* : </label>
                                    <textarea onChange={this.handleChangeOtherExperiences} id="experienceDetails" name="experienceDetails" className="input-experience-description mb-3" placeholder="Enter a brief about your experience..." value={this.state.experienceDetails} required></textarea>
                                </div>
                            </div>
                            <div className="pre-loader">
                                <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader_3 }} />
                            </div>
                            <div className="submit-profile-info" style={{ display: this.state.submit_button_3 }}>
                                <input type="submit" className="profile-info-submit-btn" value="Add Other Experience Details" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { addFreelancerPortfolioData, addFreelancerEmploymentHistory })(MultipleAddFormPage)