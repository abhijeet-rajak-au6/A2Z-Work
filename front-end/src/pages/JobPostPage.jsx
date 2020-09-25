import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { headerAuthorization } from '../axios'
import { clientJobPost } from '../redux/actions/dataAction'
import pre_loader from '../img/pre_loader.svg';
import '../styles/JobPostPage.css'

const initialState = {
    pre_loader: "none",
    submit_button: "block",
    projectFile: "",
    jobTitle: "",
    jobDescription: "",
    projectType: "",
    freelancerNo: "",
    budgetType: "",
    budgetAmount: "",
    projectDuration: "",
    expertiseLevel: "",
    category: "",
    skills: "",

}


class JobPostPage extends Component {
    state = initialState
    componentDidMount() {
        headerAuthorization()
    }
    handleChangeJobPostData = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleChangeProjectFile = (event) => {
        this.setState({ projectFile: event.target.files });
    }
    handleSubmitJobPostData = async (event) => {
        event.preventDefault()
        console.log(this.state)
        this.setState({ pre_loader: !this.state.pre_loader, submit_button: "none" })
        const formData = new FormData();
        try {
            for (let i = 0; i < this.state.projectFile.length; i++) {
                formData.append("projectFile", this.state.projectFile[i]);
            }
            formData.append("category", this.state.category);
            formData.append("skills", this.state.skills);
            formData.append("jobTitle", this.state.jobTitle)
            formData.append("projectDuration", this.state.projectDuration)
            formData.append("jobDescription", this.state.jobDescription)
            formData.append("projectType", this.state.projectType)
            formData.append("expertiseLevel", this.state.expertiseLevel)
            formData.append("budgetType", this.state.budgetType)
            formData.append("budgetAmount", this.state.budgetAmount)
            formData.append("freelancerNo", this.state.freelancerNo)
            const response = await this.props.clientJobPost(formData)
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            })
            this.props.history.push("/myJobsPageClient")

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `${err}`,
            })
            this.setState(initialState)
        }
    }
    componentWillUnmount() {
        this.setState(initialState)
    }








    render() {
        return (
            <div className="container">
                <div className="edit-profile-container">
                    <div className="form-info-header">
                        <h6>Please fill the fields below very carefully...all *fields are mandatory</h6>
                    </div>
                    <form onSubmit={this.handleSubmitJobPostData}>
                        <div className="file-upload-container">
                            <div className="img-upload mb-3">
                                <label htmlFor="img-file">Project files* : </label>
                                <input onChange={this.handleChangeProjectFile} type="file" id="img-file" name="projectFile" className="project-file-upload-input" multiple required />
                            </div>
                        </div>
                        <div className="profile-title-container">
                            <label htmlFor="title">Job Title* : </label>
                            <input onChange={this.handleChangeJobPostData} type="text" id="title" name="jobTitle" className="freelancer-input-title" placeholder="Enter a single sentence description of your job..." value={this.state.jobTitle} required />
                            <div className="row mt-3">
                                <label htmlFor="description" className="ml-3">Job Details* : </label>
                                <textarea onChange={this.handleChangeJobPostData} id="description" name="jobDescription" className="input-job-description" placeholder="Enter a brief about your job..." value={this.state.jobDescription} required></textarea>
                            </div>
                        </div>
                        <div className="input-select-container mt-3">
                            <div className="availablity-container">
                                <label htmlFor="projectType">Project type* : </label>
                                <select onChange={this.handleChangeJobPostData} className="select-project-type" id="projectType" name="projectType" value={this.state.projectType} required>
                                    <option value="" disabled>Choose...one</option>
                                    <option value="One time">One time(Find the right skills for a short term need)</option>
                                    <option value="On going">On going(Find a skill resource for an extended engagement)</option>
                                    <option value="Complex">Complex(Find specialized experts for large projects)</option>
                                </select>
                            </div>
                            <div className="freelancer-required-container mt-3">
                                <label htmlFor="freelancer-no">Freelancer no : </label>
                                <input onChange={this.handleChangeJobPostData} type="text" id="freelancer-no" name="freelancerNo" className="freelancer-no-input" placeholder="Enter no of freelancers required for this project..." value={this.state.freelancerNo} required />
                            </div>
                            <div className=" row hourly-rate-container">
                                <div className="col-2">
                                    <p className="category-header">Budget* : </p>
                                </div>
                                <div className="col-10">
                                    <div className="budget-container">
                                        <label htmlFor="budget-type" style={{ fontSize: "20px" }}> Type : </label>
                                        <select onChange={this.handleChangeJobPostData} id="budget-type" className="select-budget-type" name="budgetType" value={this.props.budgetType}>
                                            <option value="">Choose one</option>
                                            <option value="Hourly">Hourly</option>
                                            <option value="Fixed price">Fixed price</option>
                                        </select>
                                        <label htmlFor="budgetAmount" style={{ fontSize: "20px" }}>Amount* : </label>
                                        <i className="fas fa-dollar-sign dolar-icon-amount"></i>
                                        <input onChange={this.handleChangeJobPostData} type="text" id="budgetAmount" name="budgetAmount" placeholder="Your profile rate" className="budget-amount-input" value={this.state.budgetAmount} required />
                                    </div>
                                </div>
                            </div>
                            <div className="project-preference-container mt-3">
                                <label htmlFor="projectDuration">Project Duration* : </label>
                                <select onChange={this.handleChangeJobPostData} className="select-project-preference" id="projectDuration" name="projectDuration" value={this.state.projectDuration} required>
                                    <option value="" disabled>Choose...one</option>
                                    <option value="More than 6 months">More than 6 months</option>
                                    <option value="More than 3 months">More than 3 months</option>
                                    <option value="More than 1 month">More than 1 month</option>
                                    <option value="Less than 1 month">Less than 1 month</option>
                                </select>
                            </div>
                            <div className="experience-level-container mt-3">
                                <label htmlFor="expertiseLevel">Required expertise* : </label>
                                <select onChange={this.handleChangeJobPostData} className="select-experience-level" id="expertiseLevel" name="expertiseLevel" value={this.state.expertiseLevel} required>
                                    <option value="" disabled>Choose...one</option>
                                    <option value="Entry level">Entry level</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                            <div className="row category-container mt-3">
                                <div className="col-2">
                                    <p className="category-header">Categories* : </p>
                                </div>
                                <div className="col-10">
                                    <div className="category-checkbox-container">
                                        <label style={{ fontSize: "20px" }} className="category-label">Web, Mobile & Software Dev
                                    <input onChange={this.handleChangeJobPostData} type="radio" name="category" value="Web, Mobile & Software Dev" required />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Data Science & Analytics
                                    <input onChange={this.handleChangeJobPostData} type="radio" name="category" value="Data Science & Analytics" required />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Sales & Marketing
                                    <input onChange={this.handleChangeJobPostData} type="radio" name="category" value="Sales & Marketing" required />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">IT & Networking
                                    <input onChange={this.handleChangeJobPostData} type="radio" name="category" value="IT & Networking" required />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Design & Creative
                                    <input onChange={this.handleChangeJobPostData} type="radio" name="category" value="Design & Creative" required />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row skill-container mt-3">
                                <label htmlFor="skill" className="ml-3"> Required skills* : </label>
                                <textarea onChange={this.handleChangeJobPostData} id="skill" name="skills" className="project-input-skill" placeholder="Enter all the skills you want to have according to your project seperated by comma','(e.g Javascript, SEO - Search Engine Optimization...etc.)" value={this.state.skills} required></textarea>
                            </div>
                        </div>
                        <div className="pre-loader">
                            <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                        </div>
                        <div className="submit-profile-info" style={{ display: this.state.submit_button }}>
                            <input type="submit" className="profile-info-submit-btn" value="Post Job" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { clientJobPost })(JobPostPage)


