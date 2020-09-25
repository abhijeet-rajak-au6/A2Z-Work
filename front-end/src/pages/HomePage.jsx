import React from 'react'
import img_1 from '../img/img_1.png'
import img_2 from '../img/img_2.png'
import img_3 from '../img/img_3.png'
import img_4 from '../img/img_4.png'
import img_5 from '../img/img_5.png'
import img_6 from '../img/img_6.png'
import img_7 from '../img/img_7.png'
import img_8 from '../img/img_8.png'
import microsoft from '../img/microsoft.svg'
import amazon from '../img/amazon.svg'
import bmw from '../img/bmw.svg'
import deloitte from '../img/deloitte.svg'
import facebook from '../img/facebook.svg'
import ibm from '../img/ibm.svg'
import lamborghini from '../img/lamborghini.svg'
import google from '../img/google.svg'

import '../styles/HomePage.css'


const HomePage = (props) => {

    const handleBannerClick = () => {
        props.history.push("/register")
    }
    return (
        <div className="home-page-container">
            <div className="banner-section">
                <div className="banner-title">
                    <p>In-demand talent,</p>
                    <p>on demand.</p>
                    <p>A2ZWORK is how.</p>
                </div>
                <div className="banner-description">
                    <p>Hire proven pros with confidence using the world’s </p>
                    <p>largest, remote talent platform.</p>
                </div>
                <div className="banner-button">
                    <button onClick={handleBannerClick} type="button" className="btn btn-warning btn-lg">Hire a freelancer</button>
                    <button onClick={handleBannerClick} type="button" className="btn btn-light btn-lg ml-sm-3">Earn money freelancing</button>
                </div>
            </div>
            <div className="container">
                <p className="text-center category-section-header">Find quality talent or agencies</p>
                <div className="category-section">
                    <div className="card category-card" style={{ width: "16rem" }}>
                        <img src={img_1} className="card-img-top" alt="category" width="100%" />
                        <div className="card-body">
                            <h6 className="card-title text-center m-0 p-0">Web, Mobile & Software Dev</h6>
                        </div>
                    </div>
                    <div className="card category-card" style={{ width: "16rem" }}>
                        <img src={img_2} className="card-img-top" alt="category" width="100%" />
                        <div className="card-body">
                            <h6 className="card-title text-center m-0 p-0">Design & Creative</h6>
                        </div>
                    </div>
                    <div className="card category-card" style={{ width: "16rem" }}>
                        <img src={img_3} className="card-img-top" alt="category" width="100%" />
                        <div className="card-body">
                            <h6 className="card-title text-center m-0 p-0">Writing</h6>
                        </div>
                    </div>
                    <div className="card category-card" style={{ width: "16rem" }}>
                        <img src={img_4} className="card-img-top" alt="category" width="100%" />
                        <div className="card-body">
                            <h6 className="card-title text-center m-0 p-0">Sales & Marketing</h6>
                        </div>
                    </div>
                    <div className="card category-card" style={{ width: "16rem" }}>
                        <img src={img_5} className="card-img-top" alt="category" width="100%" />
                        <div className="card-body">
                            <h6 className="card-title text-center m-0 p-0">Admin Support</h6>
                        </div>
                    </div>
                    <div className="card category-card" style={{ width: "16rem" }}>
                        <img src={img_6} className="card-img-top" alt="category" width="100%" />
                        <div className="card-body">
                            <h6 className="card-title text-center m-0 p-0">Customer Service</h6>
                        </div>
                    </div>
                    <div className="card category-card" style={{ width: "16rem" }}>
                        <img src={img_7} className="card-img-top" alt="category" width="100%" />
                        <div className="card-body">
                            <h6 className="card-title text-center m-0 p-0">Data Science & Analytics</h6>
                        </div>
                    </div>
                    <div className="card category-card" style={{ width: "16rem" }}>
                        <img src={img_8} className="card-img-top" alt="category" width="100%" />
                        <div className="card-body">
                            <h6 className="card-title text-center m-0 p-0">Engineering & Architecture</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container brands-container">
                <p className="text-center brands-header">Trusted by 5M+ businesses</p>
                <div className="brands-name">
                    <img src={microsoft} alt="brands" width="100" height="100" />
                    <img src={amazon} alt="brands" width="100" height="100" />
                    <img src={bmw} alt="brands" width="100" height="100" />
                    <img src={deloitte} alt="brands" width="100" height="100" />
                    <img src={facebook} alt="brands" width="100" height="100" />
                    <img src={ibm} alt="brands" width="100" height="100" />
                    <img src={google} alt="brands" width="100" height="100" />
                    <img src={lamborghini} alt="brands" width="100" height="100" />
                </div>
            </div>
        </div>
    )
}

export default HomePage
