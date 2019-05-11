import React, {Component} from 'react';
import '../App.css'
import {getCategories, getProducts} from "../store/actions/chatActions";
import connect from "react-redux/es/connect/connect";
import {NavLink} from "react-router-dom";
import ProductThumbnail from "../components/UI/ProductThumbnail";
import FormElement from "../components/UI/FormElement";


class Main extends Component {

    state = {
        messageText: '',
        username: '',
        messages: [],
        usernameSet: false
    };

    componentDidMount() {
        this.websocket = new WebSocket('ws://localhost:8003/chat');
        this.websocket.onmessage = e => {

            const decodedMessage = JSON.parse(e.data);
            console.log(this.state);
            if (decodedMessage.type === 'NEW_MESSAGE') {
                this.setState({
                    messages: [
                        ...this.state.messages,
                        decodedMessage.message
                    ]
                })
            }
        }
    }

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    setUserName = e => {
        e.preventDefault();
        this.websocket.send(JSON.stringify({
            type: 'SET_USERNAME',
            username: this.state.username
        }));
        this.setState({usernameSet: true});
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

        // let chat = (
        //     <div>
        //         {this.state.messages.map((message, idx) => (
        //             <div key={idx}>
        //                 <b>{message.username} : </b>
        //                 {message.text}
        //             </div>
        //         ))}
        //         <form onSubmit={this.sendMessage}>
        //             <input
        //                 type="text"
        //                 name="messageText" value={this.state.messageText}
        //                 onChange={this.inputChangeHandler}/>
        //             <input type="submit" value="Send"/>
        //         </form>
        //     </div>
        // );
        //
        // if (!this.state.usernameSet) {
        //     chat = (
        //         <form onSubmit={this.setUserName}>
        //             <input type="text" name="username" value={this.state.username} onChange={this.inputChangeHandler}/>
        //             <input type="submit" value="Enter Chat"/>
        //         </form>
        //     );
        // }

        return (
            <div className="App">
                <div className="users_div">
                    <p>Users</p>
                    {/*{this.props.users ? this.props.users.map(user => <p key={user._id}>{user.title}</p>*/}
                    {/*) : null}*/}
                </div>
                <div className="messages_thumbnail_div">
                    {/*{this.props.chat ? this.props.chat.map(item => <ProductThumbnail*/}
                    {/*    key={item._id}*/}
                    {/*    id={item._id}*/}
                    {/*    image={item.image}*/}
                    {/*    class= "img_thumbnail"*/}
                    {/*    alt={item.title}*/}
                    {/*    title={item.title}*/}
                    {/*    price={item.price}*/}
                    {/*/>) : null}*/}
                </div>
                <div className="chat_element">
                    <FormElement
                        propertyName="message"
                        title="Message"
                        type="text"
                        value={this.state.messageText}
                        onChange={this.inputChangeHandler}
                        placeholder="Enter message"
                        autocomplete="current-message"
                        error={this.getFieldError('message')}
                    />
                    {/*{chat}*/}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.chat.users,
    chat: state.chat.chat,
});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);