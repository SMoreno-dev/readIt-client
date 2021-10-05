import React from "react";

import logo from './title-logo.png';
import './NavBar.css';

import { useHistory } from "react-router";

const NavBar = () => {
    const history = useHistory();
    
    const handleSignIn = () => {
        if(!localStorage.id) {
            return history.push('/reddit-clone-client/signin');
        } else {
            localStorage.removeItem('id');
            return history.push('/reddit-clone-client/signin');
        }
    }

    return(
        <div className='nv-container'>
            <div className='logo-and-subreddits'>
                <img
                    src={logo}
                    className='readit-logo'
                    onClick={() => history.push('/')}
                    alt='logo'
                >
                </img>
                <p className='nv-separator'>{" || "}</p>
                <div 
                    className='nv-subreddits'
                    onClick={() => history.push('/reddit-clone-client/subreddits')}
                    >
                    {`subreddits`}
                </div>
            </div>

            <div className='nav-end'>
                <p 
                    className='nav-user'
                    onClick={() => history.push(`/reddit-clone-client/user/${localStorage.user}`)}
                >
                    {!localStorage.id ? null : localStorage.user}
                </p>


                <div
                    className='navbar-button'
                    onClick={() => handleSignIn()}
                >
                {
                    !localStorage.id ? 'Sign In' : 'Sign Out'
                }
                </div>
            </div>

        </div>
    )
}

export default NavBar;