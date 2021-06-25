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
import Subreddit from '../components/Subreddit/Subreddit';
import Post from '../components/Post/Post'



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
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path="/profile"> 
                      {loggedIn === false ? <Redirect to='/signin' /> : <Profile />}
                </Route>
                <Route exact path="/submit/:subredditName" component={CreatePost}/>
                <Route exact path="/r/:subredditName" component={Subreddit} />
                <Route exact path="/r/:subredditName/post=:postId" component={Post} />
            </Switch>
      </Router>
    )
}

export default RootContainer;