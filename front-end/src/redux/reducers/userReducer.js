import {
	SET_USER,
	TOGGLE_AUTHENTICATING,
	LOGOUT_USER,
	EXPIRE_REFRESH_TOKEN,
	UPDATE_ACCESS_TOKEN,
} from "../actionTypes";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	isAuthenticating: false,
};

const userReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_USER:
			const userJson = JSON.stringify(payload);
			localStorage.setItem("user", userJson);
			return { ...state, user: payload };
		case TOGGLE_AUTHENTICATING:
			return { ...state, isAuthenticating: !state.isAuthenticating };
		case LOGOUT_USER:
			localStorage.removeItem("user");
			return { ...state, user: null };
		case EXPIRE_REFRESH_TOKEN:
			localStorage.removeItem("user");
			return { ...state, user: null };
		case UPDATE_ACCESS_TOKEN:
			const updateUserJson = JSON.stringify(payload);
			localStorage.setItem("user", updateUserJson);
			return { ...state, user: payload };
		default:
			return state;
	}
};

export default userReducer;
