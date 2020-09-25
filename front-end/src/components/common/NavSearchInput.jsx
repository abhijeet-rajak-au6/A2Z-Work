import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { searchJobsByCategory } from '../../redux/actions/dataAction'

const initialState = {
    category: "",
}

class NavSearchInput extends Component {
    state = initialState
    handleChangeJobsCategory = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmitSearchJobs = async (event) => {
        event.preventDefault()
        try {
            const response = await this.props.searchJobsByCategory(this.state.category)
            if (response) {
                this.props.history.push("/jobFeed")
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: `${err}`
            })
        }
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmitSearchJobs} className="form-inline mr-auto nav-search-form">
                    <input onChange={this.handleChangeJobsCategory} className="mr-sm-2 nav-search-input" type="search" name="category" placeholder="Search for jobs or freelancers..." value={this.state.category} required />
                    <input className="btn btn-success nav-search-button" type="submit" value="Search" />
                </form>
            </>
        )
    }
}

export default connect(null, { searchJobsByCategory })(withRouter(NavSearchInput))