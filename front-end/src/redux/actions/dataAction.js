import axios from "../../axios";
import {
	FETCH_USER_PROFILE_DATA,
	TOGGLE_FETCHING,
	SET_USER,
	FETCH_ALL_OPEN_JOBS,
	FETCH_JOB_DETAILS,
	FETCH_CLIENT_ALL_JOBS,
	FETCH_ALL_JOB_APPLICATIONS,
	FETCH_CLIENT_REVIEW,
	FETCH_JOB_DETAILS_HISTORY,
	SET_CHAT_ROOM,
	FETCH_ALL_CHAT_ROOMS,
	FETCH_CHAT_ROOM_MESSAGES,
} from "../actionTypes";
export const editFreelancerProfile = mainProfileData => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEditUserProfile
`,
				mainProfileData,
			);
			console.log(response.data);
			dispatch({ type: SET_USER, payload: response.data });
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const addFreelancerPortfolioData = portfolioData => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/portfolioUpdate
`,
				portfolioData,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const addFreelancerEmploymentHistory = employmentHistory => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEmpHistory

`,
				employmentHistory,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const editClientProfile = mainProfileData => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/postEditClientProfile
`,
				mainProfileData,
			);
			console.log(response.data);
			dispatch({ type: SET_USER, payload: response.data });
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const getUserProfileData = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({
				type: FETCH_USER_PROFILE_DATA,
				payload: null,
			});
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(`${process.env
				.REACT_APP_BASE_URL}/getUserProfile
`);
			console.log(response.data.userProfile);
			dispatch({
				type: FETCH_USER_PROFILE_DATA,
				payload: response.data.userProfile,
			});
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const downloadResume = async url => {
	const response = await fetch(url);
	const responseBlob = await response.blob();
	let newUrl = window.URL.createObjectURL(responseBlob);
	let a = document.createElement("a");
	a.href = newUrl;
	a.download = "file";
	a.click();
};

export const getUserPortfolio = () => async (dispatch, getState) => {
	const userProfile = getState().dataState.userProfile;
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(`${process.env
				.REACT_APP_BASE_URL}/getUserPortfolio
`);
			console.log(response.data);
			userProfile.userPortfolio = response.data.userPortfolio;
			dispatch({ type: FETCH_USER_PROFILE_DATA, payload: userProfile });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const getEmploymentHistory = () => async (dispatch, getState) => {
	const userProfile = getState().dataState.userProfile;
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(`${process.env
				.REACT_APP_BASE_URL}/getEmpHistory
`);
			console.log(response.data);
			userProfile.empHistory = response.data.empHistory;
			dispatch({ type: FETCH_USER_PROFILE_DATA, payload: userProfile });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const clientJobPost = jobPostData => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/jobPost
`,
				jobPostData,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const getFreelancerProfileData = freelancerId => dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({
				type: FETCH_USER_PROFILE_DATA,
				payload: null,
			});
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(`${process.env
				.REACT_APP_BASE_URL}/getSpecificUserDetails/${freelancerId}
`);
			console.log(response.data);
			dispatch({
				type: FETCH_USER_PROFILE_DATA,
				payload: response.data,
			});
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const getAllOpenJobs = (category = "") => async dispatch => {
	console.log(category);
	return new Promise(async (resolve, reject) => {
		try {
			if (category.includes("&")) {
				category = category.split("&").join("@");
			}
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getOpenJobs?${category.length !== 0
					? "category=" + category
					: ""}`,
			);
			console.log(response.data);
			dispatch({ type: FETCH_ALL_OPEN_JOBS, payload: response.data.openJob });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const getJobDetails = jobId => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_JOB_DETAILS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getParticularJob/${jobId}`,
			);

			console.log(response.data);
			dispatch({ type: FETCH_JOB_DETAILS, payload: response.data.job });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const getClientAllPostedJobs = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_CLIENT_ALL_JOBS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getUserJobPosted`,
			);
			console.log(response.data);
			dispatch({ type: FETCH_CLIENT_ALL_JOBS, payload: response.data });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const applyJob = (jobId, coverLetter) => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/applyJob/${jobId}`,
				coverLetter,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const getAllJobApplications = jobId => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_ALL_JOB_APPLICATIONS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getUserAppliedJob/${jobId}`,
			);
			console.log(response.data);
			dispatch({
				type: FETCH_ALL_JOB_APPLICATIONS,
				payload: response.data.appliedJobs,
			});
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const hireFreelancer = (jobId, freelancerId, userId) => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env
					.REACT_APP_BASE_URL}/sendHireEmail/${jobId}/${freelancerId}/${userId}`,
			);

			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		}
	});
};

export const getFreelancerJobApplications = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_ALL_JOB_APPLICATIONS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/freelancerJobDetails`,
			);
			console.log(response.data);
			dispatch({
				type: FETCH_ALL_JOB_APPLICATIONS,
				payload: response.data,
			});
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const getFreelancerJobApplication = jobId => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_ALL_JOB_APPLICATIONS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env
					.REACT_APP_BASE_URL}/getFreelancerJobApplication/${jobId}`,
			);
			console.log(response.data);
			dispatch({
				type: FETCH_ALL_JOB_APPLICATIONS,
				payload: response.data.application,
			});
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const addFreelancerReview = (jobId, review) => () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/addFreelancerReview/${jobId}`,
				review,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const addClientReview = (jobId, review) => () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/addClientReview/${jobId}`,
				review,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const getClientReview = (jobId, userId) => dispatch => {
	console.log(jobId, userId);
	return new Promise(async (resolve, reject) => {
		try {
			try {
				dispatch({ type: FETCH_CLIENT_REVIEW, payload: null });
				dispatch({ type: TOGGLE_FETCHING });
				const response = await axios.get(
					`${process.env
						.REACT_APP_BASE_URL}/getClientReview/${jobId}/${userId}`,
				);
				console.log(response.data);
				dispatch({
					type: FETCH_CLIENT_REVIEW,
					payload: response.data,
				});
				resolve(response.data.msg);
			} catch (err) {
				console.log(err);
				if (err.response.status === 401) {
					reject("Your session has been expired...pls login again");
				} else {
					reject(err.response.data.msg);
				}
			} finally {
				dispatch({ type: TOGGLE_FETCHING });
			}
		} catch (err) {}
	});
};

export const getJobDetailsHistory = jobId => dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_JOB_DETAILS_HISTORY, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getParticularJob/${jobId}`,
			);

			console.log(response.data);
			dispatch({ type: FETCH_JOB_DETAILS_HISTORY, payload: response.data.job });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const searchJobsByCategory = category => dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_ALL_OPEN_JOBS, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env
					.REACT_APP_BASE_URL}/searchJobsByCategory?category=${category}`,
			);
			console.log(response.data);
			dispatch({ type: FETCH_ALL_OPEN_JOBS, payload: response.data.jobs });
			resolve(response.data.msg);
		} catch (err) {
			console.log(err);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const createChatRoom = userId_2 => async dispatch => {
	const userId_1 = JSON.parse(localStorage.getItem("user")).userId;
	const roomName = userId_1.toString() + "-" + userId_2.toString();
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/createChatroom`,
				{
					name: roomName,
					freelancer: userId_2,
					client: userId_1,
				},
			);
			console.log(response.data);
			resolve(response.data.msg);
			dispatch({ type: SET_CHAT_ROOM, payload: response.data.chatroom });
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const getAllChatrooms = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_FETCHING });
			dispatch({ type: FETCH_ALL_CHAT_ROOMS, payload: null });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/allChatrooms`,
			);
			console.log(response.data);
			resolve(response.data.msg);
			dispatch({
				type: FETCH_ALL_CHAT_ROOMS,
				payload: response.data.chatrooms,
			});
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};

export const getSpecificChatroom = chatroomId => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: SET_CHAT_ROOM, payload: null });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/chatroom/${chatroomId}`,
			);
			console.log(response.data);
			resolve(response.data.msg);
			dispatch({ type: SET_CHAT_ROOM, payload: response.data.chatroom });
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};
export const fetchChatroomAllMessages = chatroomId => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: FETCH_CHAT_ROOM_MESSAGES, payload: null });
			dispatch({ type: TOGGLE_FETCHING });
			const response = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/chatroomMessages/${chatroomId}`,
			);
			console.log(response.data);
			dispatch({
				type: FETCH_CHAT_ROOM_MESSAGES,
				payload: response.data.messages,
			});
			resolve(response.data.messages);
		} catch (err) {
			console.log(err);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_FETCHING });
		}
	});
};
