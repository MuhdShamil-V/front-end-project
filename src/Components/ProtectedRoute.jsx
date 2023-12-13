import React from 'react';
import { Route, redirect } from 'react-router-dom';


const ProtectedRoute = ({isAuth: isAuth, component: Component, ...rest }) => {
    return(
        <Route
            {...rest}
            render = {(props) => {
                if(isAuth) {
                    return <Component />
                } else {
                    return (
                        <redirect to={{pathname: '/', state: {from: props.location} }} />
                    )
                }
            }}
        />
    )
}

export default ProtectedRoute;