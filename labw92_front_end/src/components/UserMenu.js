import React from 'react';
import {NavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {

    return (
        <div className="user_menu">
            <div>
                Hello, {user.username}!
            </div>
            <div className="user_menu">
                <NavLink onClick={logout} to="/" exact>Exit</NavLink>
            </div>
        </div>)
};

export default UserMenu;