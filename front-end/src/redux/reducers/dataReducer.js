import {
	FETCH_USER_PROFILE_DATA,
	TOGGLE_FETCHING,
	FETCH_ALL_OPEN_JOBS,
	FETCH_JOB_DETAILS,
	FETCH_CLIENT_ALL_JOBS,
	FETCH_ALL_JOB_APPLICATIONS,
	FETCH_CLIENT_REVIEW,
	FETCH_JOB_DETAILS_HISTORY,
	SET_CHAT_ROOM,
	FETCH_CHAT_ROOM_MESSAGES,
	FETCH_ALL_CHAT_ROOMS,
} from "../actionTypes";

const initialState = {
	userProfile: null,
	isFetching: false,
	allOpenJobs: null,
	jobDetails: null,
	allClientJobs: null,
	allJobApplications: null,
	clientReview: null,
	jobDetailsHistory: null,
	chatroom: null,
	chatroomMessages: null,
	allChatroom: null,
};

const dataReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_USER_PROFILE_DATA:
			return { ...state, userProfile: payload };
		case TOGGLE_FETCHING:
			return { ...state, isFetching: !state.isFetching };
		case FETCH_ALL_OPEN_JOBS:
			return { ...state, allOpenJobs: payload };
		case FETCH_JOB_DETAILS:
			return { ...state, jobDetails: payload };
		case FETCH_CLIENT_ALL_JOBS:
			return { ...state, allClientJobs: payload };
		case FETCH_ALL_JOB_APPLICATIONS:
			return { ...state, allJobApplications: payload };
		case FETCH_CLIENT_REVIEW:
			return { ...state, clientReview: payload };
		case FETCH_JOB_DETAILS_HISTORY:
			return { ...state, jobDetailsHistory: payload };
		case SET_CHAT_ROOM:
			return { ...state, chatroom: payload };
		case FETCH_CHAT_ROOM_MESSAGES:
			return { ...state, chatroomMessages: payload };
		case FETCH_ALL_CHAT_ROOMS:
			return { ...state, allChatroom: payload };
		default:
			return state;
	}
};

export default dataReducer;
