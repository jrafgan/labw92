import React from 'react';
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const Layout = ({user, logout}) => {

    return (
        <div className="main_nav">
            <h2 className="h2">Chat Room</h2>
            {user ?
                <UserMenu user={user} logout={logout}/> : <AnonymousMenu/> }
        </div>
    )
};


export default Layout;