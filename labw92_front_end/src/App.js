import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "./store/actions/usersActions";
import Routes from "./Routes";
import Layout from "./components/Layout";

class App extends Component {

    closeWebSocket = () =>{
        // this.websocket.send(JSON.stringify({
        //     type: 'CLOSE',
        // }));
        this.props.logoutUser();
    };

    render() {
        return (
            <Fragment>
                <header>
                    <Layout user={this.props.user} logout={this.closeWebSocket}/>
                </header>
                <div style={{marginTop: '20px'}}>
                    <Routes user={this.props.user} />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));