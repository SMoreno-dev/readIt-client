import React, { useEffect, useState } from 'react';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

//Components
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import Profile from '../components/Profile/Profile';
import CreatePost from '../components/CreatePost/CreatePost';



const RootContainer = () => {

    const [loggedIn, logIn] = useState(false);

    useEffect(() => {
        if (localStorage.id) {
            logIn(true);
            console.log('logged in', loggedIn)
            return console.log('id:', localStorage.id)
        } else {
            logIn(false)
        }
    }, [loggedIn])


    return(
        <Router>
            <Switch>
                <Route exact path='/signup'> 
                    <SignUp />
                </Route>
                <Route exact path='/signin'>
                    <SignIn />
                </Route>
                <Route exact path="/profile"> 
                      {loggedIn === false ? <Redirect to='/signin' /> : <Profile />}
                </Route>
                <Route exact path="/submit"> 
                    <CreatePost />
                </Route>
            </Switch>
      </Router>
    )
}

// const mapStateToProps = state => ({
//     loggedIn: state.user.loggedIn
// })

// const mapDispatchToProps = dispatch => ({
//     logIn: () => dispatch(logIn()),
//     logOut: () => dispatch(logOut())
// })

export default RootContainer;