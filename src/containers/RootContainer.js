import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Redirect } from 'react-router';

//Components
import NavBar from '../components/NavBar/NavBar';
import Frontpage from '../components/Frontpage/Frontpage';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import Profile from '../components/Profile/Profile';
import CreatePost from '../components/Posts/CreatePost/CreatePost';
import Subreddit from '../components/Subreddit/Subreddit';
import Post from '../components/Posts/Post/Post';

const RootContainer = () => {
    return(
        <Router>
            <Route path='/' component={NavBar} />
            <Switch>
                <Route exact path='/'> {<Redirect to='/reddit-clone-client' />} </Route>
                <Route exact path='/reddit-clone-client' component={Frontpage} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path="/user/:user" component={Profile}/>
                <Route exact path="/submit/:subredditName" component={CreatePost}/>
                <Route exact path="/r/:subredditName" component={Subreddit} />
                <Route exact path="/r/:subredditName/post=:postId" component={Post} />
            </Switch>
      </Router>
    )
}

export default RootContainer;