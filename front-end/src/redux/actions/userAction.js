import axios from "../../axios";

import { SET_USER, TOGGLE_AUTHENTICATING, LOGOUT_USER } from "../actionTypes";

export const userRegistration = newUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/userRegistration`,
				newUser,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.data.msg.includes("password:")) {
				reject(
					"Please enter a valid password that must contain min 6 character atleast one upper case , one lower case and one special character",
				);
			} else if (err.response.data.msg.includes("userEmail")) {
				reject("This email is already registered...pls login");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_AUTHENTICATING });
		}
	});
};

export const userLogin = currentUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/userLogin`,
				currentUser,
			);
			// console.log(response.data);
			dispatch({ type: SET_USER, payload: response.data });
			resolve(response.data);
		} catch (err) {
			console.error(err.response.data);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_AUTHENTICATING });
		}
	});
};

export const userSocialRegistration = newUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/socialRegister`,
				newUser,
			);
			console.log(response.data);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			if (err.response.data.msg.includes("userEmail")) {
				reject("This email is already registered...pls login");
			} else {
				reject(err.response.data.msg);
			}
		} finally {
			dispatch({ type: TOGGLE_AUTHENTICATING });
		}
	});
};

export const userSocialLogin = currentUser => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			dispatch({ type: TOGGLE_AUTHENTICATING });
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/socialLogin`,
				currentUser,
			);
			// console.log(response.data);
			dispatch({ type: SET_USER, payload: response.data });
			resolve(response.data);
		} catch (err) {
			console.error(err.response.data);
			reject(err.response.data.msg);
		} finally {
			dispatch({ type: TOGGLE_AUTHENTICATING });
		}
	});
};

export const userLogout = () => async dispatch => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_BASE_URL}/userLogout`,
			);
			console.log(response.data);
			dispatch({ type: LOGOUT_USER });
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response);
			if (err.response.status === 401) {
				reject("Your session has been expired...pls login again");
			} else {
				reject(err.response.data.msg);
			}
		}
	});
};

export const sendForgotPasswordEmail = userEmail => async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/sendForgotPasswordEmail`,
				userEmail,
			);
			console.log(response.data);

			localStorage.setItem(
				"forgotPasswordToken",
				response.data.forgotPasswordToken,
			);
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			reject(err.response.data.msg);
		}
	});
};

export const resetPassword = (forgotPasswordToken, newPassword) => async () => {
	console.log(newPassword);
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`${process.env
					.REACT_APP_BASE_URL}/changePassword/${forgotPasswordToken}`,
				newPassword,
			);
			console.log(response.data);
			localStorage.removeItem("forgotPasswordToken");
			resolve(response.data.msg);
		} catch (err) {
			console.error(err.response.data);
			reject(err.response.data.msg);
		}
	});
};
