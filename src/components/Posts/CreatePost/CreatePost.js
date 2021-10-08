import React, {useState, useEffect} from 'react';

//Router
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';

//Redux
import {connect} from 'react-redux'
import { setText } from '../../../redux/actions/userActions';

import ErrorPanel from '../../ErrorPanel/ErrorPanel';
import TextArea from '../../TextArea/TextArea';

//Css
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import './CreatePost.css'

const CreatePost = ({history, post, setText}) => {
    //Params
    const {subredditName} = useParams();

    //Error State
    const [error, setError] = useState({error: false, message: '', redirect: false});

    //Subscriptions, subreddit, post States
    const [subscriptions, setSubscriptions] = useState([]);
    const [subreddit, setSubreddit] = useState("");
    const [title, setTitle] = useState("");

    //useEffect function
    const fetchSubscription = async() => {
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/subreddit/subscriptions', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: localStorage.id
                })
            })

            const parsedResponse = await response.json();

            if(response.status !== 200) {
                console.log(parsedResponse.message)
                return setError({
                    error: true,
                    message: parsedResponse.message
                })

            } else {
                setSubscriptions(parsedResponse.body);
                const isSubscribed = parsedResponse.body.filter(s => s === subredditName);
                if(!isSubscribed[0]) {
                    setError({
                        error: true,
                        redirect: `/r/${subredditName}`,
                        message: `You are not subscribed to r/${subredditName}. Subscribe in order to post`
                    })
                }
                setSubreddit(subredditName);
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    useEffect(() => fetchSubscription(), []);

    //Event Handlers
    const handleSubreddit = (e) => {
        setSubreddit(e.target.value)
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }   

    const handleSubmit = async() => {
        try {
            if(!subscriptions[0]) {
                return setError({
                    error:true,
                    message: 'You must be subscribed to at least one subreadIt in order to post'
                })
            }

            if (subreddit.length === 0 || title.length === 0 || post.length === 0) {
                return setError({
                    error: true,
                    message: 'You must select a subreadIt and complete all fields in order to post.'
                })
            }

            const response = await fetch('https://readit-server-1.herokuapp.com/post/submit', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: localStorage.id,
                    title: title,
                    post: post,
                    subreddit: subreddit
                })
            })

            const parsedResponse = await response.json();

            if(response.status !== 200) {
                return setError({
                    error: true,
                    message: parsedResponse.message
                })
            
            } else {
                setText('');
                history.push(`/r/${subreddit}/post=${parsedResponse.postId}`); 
            }

        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

    //Not logged in
    if(!localStorage.id) {
        return <Redirect to='/signin'/>;
    } 
    
    return(
        <> 
            <div className='container-fluid create-post'>
                {/* Error Panel */}
                { error.error && !error.redirect ? <ErrorPanel message={error.message} /> : null}
                { error.error && error.redirect ? <ErrorPanel message={error.message} redirect={error.redirect} /> : null}

                <div className='create-post-form'>
                    <form>
                        <div className='select-subreddit'>
                            <label htmlFor="subreddits" className='select-subreddit-label'>Choose a subreadIt:</label>
                            <select value={subreddit} onChange={handleSubreddit}>
                                {
                                    subscriptions.map((e, i) => <option key={i}>{e}</option>)
                                }
                            </select>
                        </div>

                        <div className='create-post-input container-fluid'>

                            <label htmlFor="title-input" className="title-label">Title</label>
                            <input 
                                className='title-input'
                                type="text" 
                                name='title'
                                value={title}
                                onChange={handleTitle} 
                            ></input>
                            
                    
                            <TextArea 
                                title='Post'
                                name='post-input'
                                limit={10000}
                                cols="50"
                                rows="10"
                                className='post-input'
                            />

                            <Button 
                                className='post-button'
                                variant="secondary"
                                onClick={handleSubmit}>
                                    Submit
                            </Button>
                        </div>



                    </form>
                </div>
            </div>                
        </>
    )
}

const mapStateToProps = state => ({
    post: state.user.text
})

const mapDispatchToProps = dispatch => ({
    setText: (text) => dispatch(setText(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));