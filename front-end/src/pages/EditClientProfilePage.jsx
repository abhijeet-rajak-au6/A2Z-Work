import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { headerAuthorization } from '../axios'
import { editClientProfile } from '../redux/actions/dataAction'
import pre_loader from '../img/pre_loader.svg';
import '../styles/EditClientProfilePage.css'

const initialState = {
    pre_loader: "none",
    submit_button: "block",
    profileImage: "",
    companyName: "",
    companyTagline: "",
    companyOwner: "",
    companyWebsite: "",
    companyDescription: "",
    cityName: "",
    stateName: "",
    countryName: "",
    pinCode: "",
    phNo: "",
    panCardNo: "",
    vatId: "",
    gstIn: "",
    acceptTermsCondition: false,
}

class EditClientProfilePage extends Component {
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

    handleSubmitProfileData = async (event) => {
        event.preventDefault()
        this.setState({ pre_loader: !this.state.pre_loader, submit_button: "none" })
        const formData = new FormData();
        try {
            formData.append("profileImage", this.state.profileImage);
            formData.append("city", this.state.cityName);
            formData.append("state", this.state.stateName);
            formData.append("country", this.state.countryName);
            formData.append("pinNo", this.state.pinCode);
            formData.append("companyDescription", this.state.companyDescription)
            formData.append("companyName", this.state.companyName)
            formData.append("companyTagline", this.state.companyTagline)
            formData.append("companyWebsite", this.state.companyWebsite)
            formData.append("companyOwner", this.state.companyOwner)
            formData.append("phoneNo", this.state.phNo)
            formData.append("vatId", this.state.vatId)
            formData.append("panNo", this.state.panCardNo)
            formData.append("GSTIN", this.state.gstIn)
            formData.append("acceptTermsCondition", this.state.acceptTermsCondition)
            const response = await this.props.editClientProfile(formData)
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            })
            this.props.history.push("/clientProfile")

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
                                <input onChange={this.handleChangeProfileImg} type="file" id="img-file" name="profileImage" className="file-upload-input" required />
                            </div>
                        </div>
                        <div className="profile-title-container">
                            <label htmlFor="title">Company Name* : </label>
                            <input onChange={this.handleChangeProfileInput} type="text" id="title" name="companyName" className="input-title" placeholder="Enter your company name..." value={this.state.companyName} required />
                            <label htmlFor="owner">Company Owner* : </label>
                            <input onChange={this.handleChangeProfileInput} type="text" id="owner" name="companyOwner" className="input-title" placeholder="Enter your company owner name..." value={this.state.companyOwner} required />
                            <label htmlFor="tagline">Tagline* : </label>
                            <input onChange={this.handleChangeProfileInput} type="text" id="tagline" name="companyTagline" className="input-tagline" placeholder="Enter your company tagline..." value={this.state.companyTagline} required />
                            <label htmlFor="website">Website* : </label>
                            <input onChange={this.handleChangeProfileInput} type="url" id="website" name="companyWebsite" className="input-website" placeholder="Enter your company website link..." value={this.state.companyWebsite} required />
                            <div className="row mt-3">
                                <label htmlFor="description" className="ml-3">Overview* : </label>
                                <textarea onChange={this.handleChangeProfileInput} id="description" name="companyDescription" className="input-description" placeholder="Enter a short description of your company..." value={this.state.companyDescription} required></textarea>
                            </div>
                        </div>
                        <div className="row personal-info-container mt-3">
                            <div className="col-3">
                                <p className="category-header">Company Info* : </p>
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
                                <label style={{ fontSize: "20px" }} htmlFor="vatId">VAT ID : </label>
                                <input onChange={this.handleChangeProfileInput} type="text" id="vatId" name="vatId" className="vat-id-input" placeholder="Enter your VAT ID..." value={this.state.vatId} />
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

export default connect(null, { editClientProfile })(EditClientProfilePage)