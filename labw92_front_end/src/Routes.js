import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Main from "./containers/Main";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/"/>
};

const Routes = ({user}) => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <ProtectedRoute
                    isAllowed={user}
                    path="/chat"
                    exact
                    component={Main}
                />
            </Switch>
        </div>
    );
};

export default Routes;