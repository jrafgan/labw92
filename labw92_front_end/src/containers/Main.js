import React, {Component, Fragment} from 'react';
import '../App.css'
import connect from "react-redux/es/connect/connect";


class Main extends Component {

    state = {
        messageText: '',
        messages: [],
        onlineUsers: null
    };

    componentDidMount() {
        this.websocket = new WebSocket('ws://localhost:8003/chat?token=' + this.props.user.token);

        this.websocket.onopen = () => {

        };

        this.websocket.onmessage = e => {

            const decodedMessage = JSON.parse(e.data);

            console.log('this is API response ', decodedMessage);

            switch (decodedMessage.type) {
                case "NEW_MESSAGE":
                    this.setState({
                        messages: [
                            ...decodedMessage.message
                        ]
                    });
                    break;

                case "ACTIVE_USERS":
                    this.setState({
                        onlineUsers: decodedMessage.usernames
                    });
                    break;


                case "LATEST_MESSAGES":
                    this.setState({
                        messages: [
                            ...decodedMessage.messages
                        ]
                    });
                    break;

                default:
                    break;
            }
        };

        this.websocket.onerror = e => {
            console.error('Socket encountered error: ', e.message, 'Closing socket');
            this.close();
            return false;
        };

        // this.websocket.onclose = e => {
        //     console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        //     setTimeout(function () {
        //         this.connect();
        //         return false;
        //     }, 1000);
        // };
    }

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    sendMessage = e => {
        e.preventDefault();
        this.websocket.send(JSON.stringify({
            type: 'CREATE_MESSAGE',
            text: this.state.messageText
        }));
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };


    render() {

        let chat = (
            <Fragment>
                <div className="messages_div">
                    {this.state.messages.map((message, idx) => (
                        <p key={idx}>
                            <b>{message.user} : </b>
                            {message.text}
                        </p>
                    ))}
                </div>
                <form onSubmit={this.sendMessage} className="chat_form">
                    <input
                        type="text"
                        name="messageText" value={this.state.messageText}
                        onChange={this.inputChangeHandler}/>
                    <input type="submit" value="Send"/>
                </form>
            </Fragment>
        );

        return (
            <div className="App">
                <div className="users_div">
                    <p>Online Users</p>
                    {this.state.onlineUsers ? this.state.onlineUsers.map((user, ndx) => <p key={ndx}>{user}</p>
                    ) : null}
                </div>

                <div className="chat_element">
                    {chat}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main);