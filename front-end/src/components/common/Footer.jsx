import React from 'react'
import { Link } from 'react-router-dom'
import apple_playstore from '../../img/apple_playstore.svg'
import google_playstore from '../../img/google_playstore.svg'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="foter-info">
                <div className="company-details mt-3">
                    <h5>COMPANY</h5>
                    <Link to="/">About Us</Link>
                    <Link to="/">Privacy Policy</Link>
                    <Link to="/">Terms and Conditions</Link>
                    <Link to="/">Copyright Policy</Link>
                    <Link to="/">Code of Conduct</Link>
                    <Link to="/"> Fees and Charges</Link>
                    <Link to="/">Accessibility</Link>
                </div>
                <div className="resource-link">
                    <h5>RESOURCES</h5>
                    <Link to="/">Resources</Link>
                    <Link to="/">Customer Support</Link>
                    <Link to="/">Customer Stories</Link>
                    <Link to="/">Business Resources</Link>
                    <Link to="/">Payroll Services</Link>
                    <Link to="/">Upwork Reviews</Link>
                </div>
                <div className="social-links">
                    <h5>Apps</h5>
                    <div className="play-store-link">
                        <Link to="/"><img src={apple_playstore} alt="Apple-store" style={{ marginRight: "30px" }} width="100" height="100" /></Link>
                        <Link to="/"><img src={google_playstore} alt="Google-store" width="100" height="100" /></Link>
                    </div>
                    <div className="social-media-container">
                        <Link to="/"><i className="fab fa-facebook-square fa-2x"></i></Link>
                        <Link to="/"><i className="fab fa-youtube-square fa-2x"></i></Link>
                        <Link to="/"><i className="fab fa-linkedin fa-2x"></i></Link>
                        <Link to="/"><i className="fab fa-instagram fa-2x"></i></Link>
                        <Link to="/"><i className="fab fa-twitter-square fa-2x"></i></Link>
                    </div>
                </div>
            </div>
            <div className="copyright-text">
                <p>© 2020 A2ZWORK.pvt.ltd</p>
            </div>
        </div>
    )
}

export default Footer
