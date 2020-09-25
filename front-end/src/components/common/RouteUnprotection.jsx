import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { mapToPropsUser } from '../../redux/mapStateToProps';

const RouteProtection = ({ userObj, component: Component, ...rest }) => {
    return (
        <>
            <Route {...rest} render={(props) => (
                userObj.user ? <Redirect to="/jobFeed" /> : <Component {...props} />
            )} />
        </>
    );
};



export default connect(mapToPropsUser)(RouteProtection);

