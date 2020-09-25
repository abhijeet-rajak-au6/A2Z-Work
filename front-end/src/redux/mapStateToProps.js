export const mapToPropsUser = reduxStore => {
	return {
		userObj: { ...reduxStore.userState },
	};
};

export const mapToPropsData = reduxStore => {
	return {
		dataObj: { ...reduxStore.dataState },
	};
};

export const mergeStateToProps = reduxStore => {
	return {
		userObj: { ...reduxStore.userState },
		dataObj: { ...reduxStore.dataState },
	};
};
