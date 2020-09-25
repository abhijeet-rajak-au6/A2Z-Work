import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";

const rootReducer = combineReducers({
	userState: userReducer,
	dataState: dataReducer,
});

export default rootReducer;
