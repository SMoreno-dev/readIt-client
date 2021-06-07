import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import ErrorPanel from '../ErrorPanel/ErrorPanel';
import TextArea from '../TextArea/TextArea';

import { Button } from 'react-bootstrap';
import './CreatePost.css'


const CreatePost = ({post}) => {
    //Error Panel State
    const [error, setError] = useState({
        error: false,
        message: ''
    })

    //Subscriptions, subreddit, post States
    const [subscriptions, getSubscriptions] = useState([]);
    const [subreddit, setSubreddit] = useState("");
    const [title, setTitle] = useState("");

    //useEffect function
    const fetchSubscription = async() => {
        try {
            const response = await fetch('http://localhost:3000/subreddit/subscriptions', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: localStorage.id
                })
            })

            if(response.status !== 200) {
                console.log('Error');
                throw new Error();

            } else {
                const parsedResponse = await response.json();
                const parsedSubscriptions = await parsedResponse.subscriptions;
                await getSubscriptions(parsedSubscriptions);
                await setSubreddit(parsedSubscriptions[0]);
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
            const response = await fetch('http://localhost:3000/post/submit', {
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
            console.log('Response:', parsedResponse)

            if(response.status !== 200) {
                return setError({
                    error: true,
                    message: parsedResponse.message
                })
            } else {
                console.log(parsedResponse)
            }
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

    return(
        <> 
            <div className='container-fluid create-post'>
                {/* Error Panel */}
                { error.error ? <ErrorPanel message={error.message} /> : null}

                <div className='create-post-form'>
                    <form>
                        <div className='select-subreddit'>
                            <label htmlFor="subreddits" className='select-subreddit-label'>Choose A Subreddit:</label>
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

export default connect(mapStateToProps)(CreatePost);