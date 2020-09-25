import React from 'react'
import job_post from '../img/job_post.png'
import choose_frelancer from '../img/choose_frelancer.png'
import pay_safely from '../img/pay_safely.png'
import '../styles/AboutPage.css'

const AboutPage = () => {
    return (
        <div className="AboutPage-container">
            <div className="about-banner-container">
                <div className="background-img-layer">
                    <div className="about-banner-text">
                        <p>Get critical work done faster.</p>
                        <p>Explore the different ways you can connect with and hire top-rated,</p>
                        <p>remote professionals and agencies.</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="work-process">
                    <div className="work-card">
                        <div className="work-title">
                            <h4>The Talent Marketplace</h4>
                        </div>
                        <div className="line-break-about"></div>
                        <div className="work-description">
                            <p>Hire in-demand, remote talent in three easy steps.</p>
                        </div>
                    </div>
                    <div className="work-card">
                        <div className="work-title">
                            <h4>Pre-packaged Projects</h4>
                        </div>
                        <div className="line-break-about"></div>
                        <div className="work-description">
                            <p>Hire by project to get the exact services you need.</p>
                        </div>
                    </div>
                    <div className="work-card">
                        <div className="work-title">
                            <h4>Staffing Services</h4>
                        </div>
                        <div className="line-break-about"></div>
                        <div className="work-description">
                            <p>Our experts will find you the right person and skill set for any job.</p>
                        </div>
                    </div>
                    <div className="work-card">
                        <div className="work-title">
                            <h4>Specialized Teams</h4>
                        </div>
                        <div className="line-break-about"></div>
                        <div className="work-description">
                            <p>Quickly assemble dedicated teams for your most urgent business needs.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="work-flow">
                    <p>Need something done?</p>
                    <div className="work-flow-card-container">
                        <div className="work-flow-card  mr-5">
                            <img src={job_post} alt="Job post" />
                            <h4>Post a job</h4>
                            <p>It's easy. Simply post a job you need completed and receive competitive bids from freelancers within minutes.</p>
                        </div>
                        <div className="work-flow-card mt-3 mx-5">
                            <img src={choose_frelancer} alt="Choose freelancer" />
                            <h4>Choose freelancers</h4>
                            <p>Whatever your needs, there will be a freelancer to get it done: from web design, mobile app development, virtual assistants, product manufacturing, and graphic design (and a whole lot more).</p>
                        </div>
                        <div className="work-flow-card  ml-5">
                            <img src={pay_safely} alt="Pay safely" />
                            <h4>Pay safely</h4>
                            <p>With secure payments and thousands of reviewed professionals to choose from, Freelancer.com is the simplest and safest way to get work done online.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="more-features">
                    <p>What's great about it?</p>
                    <div className="features-card-container">
                        <div className="more-features-card">
                            <div className="features-card-header">
                                <i className="fa fa-picture-o fa-2x mr-3" aria-hidden="true"></i>
                                <h4>Browse portfolios</h4>
                            </div>
                            <p>Find professionals you can trust by browsing their samples of previous work and reading their profile reviews.</p>
                        </div>
                        <div className="more-features-card">
                            <div className="features-card-header">
                                <i className="fa fa-users fa-2x mr-3" aria-hidden="true"></i>
                                <h4>View bids</h4>
                            </div>
                            <p>Receive free bids from our talented freelancers within seconds.</p>
                        </div>
                        <div className="more-features-card">
                            <div className="features-card-header">
                                <i className="fa fa-commenting fa-2x mr-3" aria-hidden="true"></i>
                                <h4>Live chat</h4>
                            </div>
                            <p>You can live chat with your freelancers to get constant updates on the progress of your work.</p>
                        </div>
                        <div className="more-features-card">
                            <div className="features-card-header">
                                <i className="fa fa-money fa-2x mr-3" aria-hidden="true"></i>
                                <h4>Pay for quality</h4>
                            </div>
                            <p>Pay for work when it has been completed and you're 100% satisfied.</p>
                        </div>
                        <div className="more-features-card">
                            <div className="features-card-header">
                                <i className="fa fa-bell fa-2x mr-3" aria-hidden="true"></i>
                                <h4>Track progress</h4>
                            </div>
                            <p>Keep up-to-date and on-the-go with our time tracker, and mobile app.</p>
                        </div>
                        <div className="more-features-card">
                            <div className="features-card-header">
                                <i className="fa fa-clock-o fa-2x mr-3" aria-hidden="true"></i>
                                <h4>24/7 support</h4>
                            </div>
                            <p>We're always here to help. Our support consists of real people who are available 24/7.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
