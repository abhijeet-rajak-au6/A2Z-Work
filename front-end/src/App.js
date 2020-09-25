import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import "./App.css";

// Load components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import RouteProtection from "./components/common/RouteProtection";
import RouteUnprotection from "./components/common/RouteUnprotection";

// Load pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import changePasswordPage from "./pages/changePasswordPage";
import JobFeedPage from "./pages/JobFeedPage";
import FreelancerProfilePage from "./pages/FreelancerProfilePage";
import EditFreelancerProfilePage from "./pages/EditFreelancerProfilePage";
import ClientProfilePage from "./pages/ClientProfilePage";
import FreelancerProfileViewPage from "./pages/FreelancerProfileViewPage";
import EditClientProfilePage from "./pages/EditClientProfilePage";
import MultipleAddFormPage from "./pages/MultipleAddFormPage";
import ClientMyJobPage from "./pages/ClientMyJobPage";
import FreelancerMyJobPage from "./pages/FreelancerMyJobPage";
import JobPostPage from "./pages/JobPostPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import ClientJobDetailsPage from "./pages/ClientJobDetailsPage";
import freelancerJobDetailsPage from "./pages/FreelancerJobDetailsPage";
import MessagePage from "./pages/MessagePage";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/linkedin" component={LinkedInPopUp} />
				<RouteProtection exact path="/messages" component={MessagePage} />
				<RouteProtection
					exact
					path="/freelancerJobDetailsPage/:jobId"
					component={freelancerJobDetailsPage}
				/>
				<RouteProtection
					exact
					path="/clientJobDetailsPage/:jobId"
					component={ClientJobDetailsPage}
				/>
				<RouteProtection
					exact
					path="/jobDetailsPage/:jobId"
					component={JobDetailsPage}
				/>
				<RouteProtection exact path="/jobPost" component={JobPostPage} />
				<RouteProtection
					exact
					path="/myJobsPageClient"
					component={ClientMyJobPage}
				/>
				<RouteProtection
					exact
					path="/myJobsPageFreeLancer"
					component={FreelancerMyJobPage}
				/>
				<RouteProtection
					exact
					path="/editFreelancerMultipleProfileData"
					component={MultipleAddFormPage}
				/>
				<RouteProtection
					exact
					path="/FreelancerProfileViewPage/:freelancerId"
					component={FreelancerProfileViewPage}
				/>
				<RouteProtection
					exact
					path="/clientProfile"
					component={ClientProfilePage}
				/>
				<RouteProtection
					exact
					path="/editClientProfile"
					component={EditClientProfilePage}
				/>
				<RouteProtection
					path="/freelancerProfile"
					component={FreelancerProfilePage}
				/>
				<RouteProtection
					path="/editFreelancerProfile"
					component={EditFreelancerProfilePage}
				/>
				<RouteUnprotection exact path="/about" component={AboutPage} />
				<RouteUnprotection
					exact
					path="/register"
					component={RegistrationPage}
				/>
				<RouteUnprotection exact path="/login" component={LoginPage} />
				<RouteUnprotection
					exact
					path="/forgotPassword"
					component={ForgotPasswordPage}
				/>
				<Route path="/jobFeed" component={JobFeedPage} />
				<Route
					exact
					path="/changePassword/:forgotPasswordToken"
					component={changePasswordPage}
				/>
				<RouteUnprotection path="/" component={HomePage} />
				{localStorage.getItem("user") ? (
					<Redirect to="/jobFeed" />
				) : (
					<Redirect to="/" />
				)}
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
