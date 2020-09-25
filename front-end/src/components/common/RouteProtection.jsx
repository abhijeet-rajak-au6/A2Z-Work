import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { mapToPropsUser } from '../../redux/mapStateToProps';

const RouteProtection = ({ userObj, component: Component, ...rest }) => {
    return (
        <>
            <Route {...rest} render={(props) => (
                userObj.user ? <Component {...props} /> : <Redirect to="/login" />
            )} />
        </>
    );
};



export default connect(mapToPropsUser)(RouteProtection);
