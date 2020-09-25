import axios from "axios";
import { SET_USER, LOGOUT_USER } from "./redux/actionTypes";
import store from "./redux/store";

const axiosInstance = axios.create();

export const headerAuthorization = () => {
	if (localStorage.getItem("user")) {
		axiosInstance.defaults.headers.common["Authorization"] = JSON.parse(
			localStorage.getItem("user"),
		).accessToken;
	}
};

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";

const refreshAccessToken = async () => {
	const refreshToken = JSON.parse(localStorage.getItem("user")).refreshToken;
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axiosInstance.get(
				`${process.env
					.REACT_APP_BASE_URL}/generateNewAccessToken/${refreshToken}`,
			);
			console.log(response.data);
			const userJson = JSON.stringify(response.data);
			localStorage.setItem("user", userJson);
			store.dispatch({ type: SET_USER, payload: response.data });
			resolve(response.data.accessToken);
		} catch (err) {
			console.log(err);
			localStorage.removeItem("user");
			store.dispatch({ type: LOGOUT_USER });
			reject(err);
		}
	});
};

axiosInstance.interceptors.request.use(
	async config => {
		// console.log(config);
		return config;
	},
	error => {
		Promise.reject(error);
	},
);
axiosInstance.interceptors.response.use(
	response => {
		// console.log(response);
		return response;
	},
	async function(error) {
		const originalRequest = error.config;
		// console.log(error);
		// console.log(originalRequest);
		if (error.response.status === 403) {
			return Promise.reject(error);
		} else if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const accessToken = await refreshAccessToken();
				originalRequest.headers["Authorization"] = accessToken;
				return axiosInstance.request(originalRequest);
			} catch (err) {
				return Promise.reject(error);
			}
		} else {
			return Promise.reject(error);
		}
	},
);

export default axiosInstance;
