import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../img/logo.png'
import { mapToPropsUser } from "../../redux/mapStateToProps"
import { userLogout } from '../../redux/actions/userAction'
import person_icon from '../../img/person_icon.png'
import NavSearchInput from './NavSearchInput'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} width="50" height="50" alt="" loading="lazy" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {props.userObj.user ?
                        null
                        : <ul className="navbar-nav ml-sm-5">
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">How it works</Link>
                            </li>
                        </ul>}
                    <NavSearchInput />
                    <>
                        {!props.userObj.user || props.userObj.user.isFreelancer ? <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/jobFeed" className="nav-link">Find job</Link>
                            </li>
                        </ul> : null}
                        {props.userObj.user ?
                            <>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to={props.userObj.user.isFreelancer ? "/myJobsPageFreeLancer" : "/myJobsPageClient"} className="nav-link mx-sm-3">My Jobs</Link>
                                    </li>
                                    <li className="nav-item mx-sm-3">
                                        <Link to="/messages" className="nav-link"><i className="fa fa-envelope pr-2" aria-hidden="true"></i>Messages</Link>
                                    </li>
                                </ul>
                                <Link to={props.userObj.user.isFreelancer ? "/freelancerProfile" : "/clientProfile"}>
                                    <div className="nav-bar-profile mx-sm-3">
                                        <img src={props.userObj.user.profileImage ? props.userObj.user.profileImage : ""} alt="profile" onError={(e) => { e.target.onerror = null; e.target.src = `${person_icon}`; }} width="50"
                                            height="50" />
                                    </div>
                                </Link>
                            </>
                            : <ul className="navbar-nav">
                                <li className="nav-item mx-sm-3">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Signup</Link>
                                </li>
                            </ul>}
                    </>
                </div>
            </div>
        </nav>
    )
}

export default connect(mapToPropsUser, { userLogout })(Navbar)
