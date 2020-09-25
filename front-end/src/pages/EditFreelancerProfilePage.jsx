import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { headerAuthorization } from '../axios'
import { editFreelancerProfile } from '../redux/actions/dataAction'
import pre_loader from '../img/pre_loader.svg';
import '../styles/EditFreelancerProfilePage.css'

const initialState = {
    pre_loader: "none",
    submit_button: "block",
    profileImage: "",
    resume: "",
    title: "",
    freelancerDescription: "",
    availability: "",
    hourlyRate: "",
    projectPreference: "",
    experienceLevel: "",
    languages: "",
    languageProficiency: "",
    category: "",
    skills: "",
    college: "",
    collegeDegree: "",
    startingYear: "",
    passoutYear: "",
    specializationTitle: "",
    specializationSkills: "",
    cityName: "",
    stateName: "",
    countryName: "",
    pinCode: "",
    phNo: "",
    panCardNo: "",
    adharCardNo: "",
    gstIn: "",
    acceptTermsCondition: false,

}


class EditFreelancerProfilePage extends Component {
    state = initialState
    componentDidMount() {
        headerAuthorization()
    }
    handleChangeProfileInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleChangeProfileImg = (event) => {
        this.setState({ profileImage: event.target.files[0] });
    }
    handleChangeCvFile = (event) => {
        this.setState({ resume: event.target.files[0] })
    }
    handleSubmitProfileData = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader: !this.state.pre_loader, submit_button: "none" })
        const formData = new FormData();
        try {
            formData.append("profileImage", this.state.profileImage);
            formData.append("resume", this.state.resume);
            formData.append("city", this.state.cityName);
            formData.append("state", this.state.stateName);
            formData.append("country", this.state.countryName);
            formData.append("pinNo", this.state.pinCode);
            formData.append("category", this.state.category);
            formData.append("collegeName", this.state.college);
            formData.append("degree", this.state.collegeDegree);
            formData.append("startingYear", this.state.startingYear);
            formData.append("passoutYear", this.state.passoutYear);
            formData.append("skills", this.state.skills);
            formData.append("medium", this.state.languages);
            formData.append("fluency", this.state.languageProficiency);
            formData.append("specializationTitle", this.state.specializationTitle)
            formData.append("specializationSkills", this.state.specializationSkills)
            formData.append("title", this.state.title)
            formData.append("availability", this.state.availability)
            formData.append("freelancerDescription", this.state.freelancerDescription)
            formData.append("phoneNo", this.state.phNo)
            formData.append("addharNo", this.state.adharCardNo)
            formData.append("panNo", this.state.panCardNo)
            formData.append("GSTIN", this.state.gstIn)
            formData.append("projectPreference", this.state.projectPreference)
            formData.append("experienceLevel", this.state.experienceLevel)
            formData.append("hourlyRate", this.state.hourlyRate)
            formData.append("acceptTermsCondition", this.state.acceptTermsCondition)
            const response = await this.props.editFreelancerProfile(formData)
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            })
            this.props.history.push("/freelancerProfile")

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
                    <form onSubmit={this.handleSubmitProfileData}>
                        <div className="file-upload-container">
                            <div className="img-upload mb-3">
                                <label htmlFor="img-file">Your profile photo* : </label>
                                <input onChange={this.handleChangeProfileImg} type="file" id="img-file" name="profileImage" className="freelancer-file-upload-input" required />
                            </div>
                            <div className="cv-upload mb-3">
                                <label htmlFor="cv-file">Your cv/resume* : </label>
                                <input onChange={this.handleChangeCvFile} type="file" id="cv-file" name="resume" className="freelancer-file-upload-input" required />
                            </div>
                        </div>
                        <div className="profile-title-container">
                            <label htmlFor="title">Your Title* : </label>
                            <input onChange={this.handleChangeProfileInput} type="text" id="title" name="title" className="freelancer-input-title" placeholder="Enter a single sentence description of your professional skills/experience(e.g Web Designer)" value={this.state.title} required />
                            <div className="row mt-3">
                                <label htmlFor="description" className="ml-3">Overview* : </label>
                                <textarea onChange={this.handleChangeProfileInput} id="description" name="freelancerDescription" className="input-description" placeholder="Use this space to show clients you have the skills and experience they're looking for.Keep it short and make sure it's error-free." value={this.state.freelancerDescription} required></textarea>
                            </div>
                        </div>
                        <div className="input-select-container mt-3">
                            <div className="availablity-container">
                                <label htmlFor="availability">Availability* : </label>
                                <select onChange={this.handleChangeProfileInput} className="select-availability" id="availability" name="availability" value={this.state.availability} required>
                                    <option value="" disabled>Choose...one</option>
                                    <option value="More than 30 hrs/week">More than 30 hrs/week</option>
                                    <option value="Less than 30 hrs/week">Less than 30 hrs/week</option>
                                    <option value="As needed - open to offers">As needed - open to offers</option>
                                </select>
                            </div>
                            <div className="hourly-rate-container">
                                <label htmlFor="hourlyRate">Hourly Rate* : </label>
                                <i className="fas fa-dollar-sign dolar-icon"></i>
                                <input onChange={this.handleChangeProfileInput} type="text" id="hourlyRate" name="hourlyRate" placeholder="Your profile rate" className="hourly-rate-input" value={this.state.hourlyRate} required />
                            </div>
                            <div className="project-preference-container mt-3">
                                <label htmlFor="projectPreference">Project preferences* : </label>
                                <select onChange={this.handleChangeProfileInput} className="select-project-preference" id="projectPreference" name="projectPreference" value={this.state.projectPreference} required>
                                    <option value="" disabled>Choose...one</option>
                                    <option value="Both Short term & long term projects">Both Short term & long term projects</option>
                                    <option value="Long term projects(3+ months)">Long term projects(3+ months)</option>
                                    <option value="Short term projects(less than 3 months)">Short term projects(less than 3 months)</option>
                                </select>
                            </div>
                            <div className="experience-level-container mt-3">
                                <label htmlFor="experienceLevel">Experience Level* : </label>
                                <select onChange={this.handleChangeProfileInput} className="select-experience-level" id="experienceLevel" name="experienceLevel" value={this.state.experienceLevel} required>
                                    <option value="" disabled>Choose...one</option>
                                    <option value="Entry level">Entry level</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                            <div className="language-container mt-3">
                                <label htmlFor="language">Language* : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="language" name="languages" className="language-input"
                                    aria-describedby="language-help" placeholder="Enter one language..." value={this.state.languages} required />
                                <label htmlFor="proficiency">Proficiency* : </label>
                                <select onChange={this.handleChangeProfileInput} id="proficiency" className="select-language-proficiency" name="languageProficiency" value={this.state.languageProficiency} required>
                                    <option value="" disabled>Please select...</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Conversational">Conversational</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Nativ or Bilingual">Nativ or Bilingual</option>
                                </select>
                                <h6 id="language-help" className="form-text text-info">Language you know for professional communication.</h6>
                            </div>
                            <div className="row category-container mt-3">
                                <div className="col-2">
                                    <p className="category-header">Categories* : </p>
                                </div>
                                <div className="col-10">
                                    <div className="category-checkbox-container">
                                        <label style={{ fontSize: "20px" }} className="category-label">Web, Mobile & Software Dev
                                    <input onChange={this.handleChangeProfileInput} type="radio" name="category" value="Web, Mobile & Software Dev" required />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Data Science & Analytics
                                    <input onChange={this.handleChangeProfileInput} type="radio" name="category" value="Data Science & Analytics" required />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Sales & Marketing
                                    <input onChange={this.handleChangeProfileInput} type="radio" name="category" value="Sales & Marketing" required />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">IT & Networking
                                    <input onChange={this.handleChangeProfileInput} type="radio" name="category" value="IT & Networking" required />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label style={{ fontSize: "20px" }} className="category-label">Design & Creative
                                    <input onChange={this.handleChangeProfileInput} type="radio" name="category" value="Design & Creative" required />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row skill-container mt-3">
                                <label htmlFor="skill" className="ml-3">Skills* : </label>
                                <textarea onChange={this.handleChangeProfileInput} id="skill" name="skills" className="input-skill" placeholder="Enter all the skills you have according to your selected category seperated by comma','(e.g Javascript, SEO - Search Engine Optimization...etc.)" value={this.state.skills} required></textarea>
                            </div>
                        </div>
                        <div className="row education-details-container mt-3">
                            <div className="col-2">
                                <p className="category-header">Education : </p>
                            </div>
                            <div className="col-10">
                                <div className="education-container">
                                    <label style={{ fontSize: "20px" }} htmlFor="college">College/University : </label>
                                    <input onChange={this.handleChangeProfileInput} type="text" className="input-college mb-3" id="college" name="college" placeholder="Enter your school/college/university name...(e.g Oxford university)" value={this.state.college} />
                                    <label style={{ fontSize: "20px" }} htmlFor="degree">Degree : </label>
                                    <input onChange={this.handleChangeProfileInput} type="text" name="collegeDegree" id="degree" className="input-colege-degree mb-3" placeholder="Enter your degree...(e.g Bachelor of computer application(B.C.A))" value={this.state.collegeDegree} />
                                    <label style={{ fontSize: "20px" }} htmlFor="date-attended">Dates attended : </label>
                                    <input onChange={this.handleChangeProfileInput} type="date" id="date-attended" className="date-input-from" name="startingYear" max="2019-12-31" value={this.state.startingYear} />
                                    <label style={{ fontSize: "18px" }} htmlFor="date-ended">to</label>
                                    <input onChange={this.handleChangeProfileInput} type="date" id="date-ended"
                                        className="date-input-to" name="passoutYear" max="2024-12-31" value={this.state.passoutYear} />
                                </div>
                            </div>
                        </div>
                        <div className="row specialization-container mt-3">
                            <div className="col-3">
                                <p className="category-header">Specialization : </p>
                            </div>
                            <div className="col-9">
                                <div className="row specialized-title-container">
                                    <label style={{ fontSize: "20px" }} htmlFor="specialzed-title">Title : </label>
                                    <input onChange={this.handleChangeProfileInput} type="text" name="specializationTitle" id="specialzed-title" className="specialized-title-input" placeholder="Enter in which you are specialzed...(e.g Back-End-Development)" value={this.state.specializationTitle} />
                                </div>
                                <div className="row mt-3">
                                    <label style={{ fontSize: "20px" }} htmlFor="specialzed-skill">Skills : </label>
                                    <textarea onChange={this.handleChangeProfileInput} id="specialzed-skill" name="specializationSkills" className="specialzed-skill-input" placeholder="Enter all the skills you have according to your specializtion seperated by comma','(e.g Node.js, Mongodb...etc.)" value={this.state.specializationSkills}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row personal-info-container mt-3">
                            <div className="col-3">
                                <p className="category-header">Personal Info* : </p>
                            </div>
                            <div className="col-9">
                                <label style={{ fontSize: "20px" }} htmlFor="cityName">City : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="cityName" name="cityName" className="city-name-input mr-5" placeholder="Enter your city name.." value={this.state.cityName} required />
                                <label style={{ fontSize: "20px" }} htmlFor="stateName">State : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="stateName" name="stateName" className="city-name-input" placeholder="Enter your state name.." value={this.state.stateName} required />
                                <label style={{ fontSize: "20px" }} htmlFor="countryName">Country : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="countryName" name="countryName" className="city-name-input mr-3" placeholder="Enter your country name.." value={this.state.countryName} required />
                                <label style={{ fontSize: "20px" }} htmlFor="pinCode">PIN : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="pinCode" name="pinCode" className="city-name-input" placeholder="Enter your postal code.." value={this.state.pinCode} required />
                                <label style={{ fontSize: "20px" }} htmlFor="phNo">Ph No : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="phNo" name="phNo" className="ph-no-input" placeholder="Enter your mobile no with country code.." value={this.state.phNo} required />
                                <label style={{ fontSize: "20px" }} htmlFor="panNo">Pan Card No : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="panNo" name="panCardNo" className="ph-no-input" placeholder="Enter your pan card no.." value={this.state.panCardNo} />
                                <label style={{ fontSize: "20px" }} htmlFor="adharNo">Adhar Card No : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="adharNo" name="adharCardNo" className="ph-no-input" placeholder="Enter your adhar card no...(only for Indian)" value={this.state.adharCardNo} />
                                <label style={{ fontSize: "20px" }} htmlFor="gstIn">GST IN : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="gstIn" name="gstIn" className="ph-no-input" placeholder="Enter your GST no.." value={this.state.gstIn} />
                            </div>
                        </div>
                        <div className="terms-conditions-container">
                            <label style={{ color: '#fff200' }} className="terms-conditions-lable">I accept the all the terms and conditions*.
                                 <input onChange={(event) => { this.setState({ acceptTermsCondition: event.target.checked }) }} type="checkbox" name="termsConditionsCheckbox" required />
                                <span className="terms-conditions-checkmark"></span>
                            </label>
                        </div>
                        <div className="pre-loader">
                            <img src={pre_loader} alt="loading" width="75" height="75" style={{ display: this.state.pre_loader }} />
                        </div>
                        <div className="submit-profile-info" style={{ display: this.state.submit_button }}>
                            <input type="submit" className="profile-info-submit-btn" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { editFreelancerProfile })(EditFreelancerProfilePage)