import React, { useState, useEffect } from 'react';

import ErrorPanel from '../../ErrorPanel/ErrorPanel';
import PostPreview  from '../PostPreview/PostPreview';

import { Button } from 'react-bootstrap';
import './PostCollection.css';

const PostCollection = ({frontpage, subreddit, profile}) => {
    //Error State
    const [error, setError] = useState({error: false, message: ''});

    //Post collection state
    const [previews, setPreviews] = useState([]);
    const [orderByVotes, setOrderBy] = useState(false)
    const [limit, setLimit] = useState(10);

    //useEffect Subreddit Function
    const fetchSubredditPreviews = async(sub) => {
        setPreviews([]);
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/post/previews', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: localStorage.id,
                    subredditName: sub,
                    limit: limit,
                    orderByVotes: orderByVotes
                })
            })
            const parsedRes = await response.json();
            if(response.status !== 200) {
                console.log('ERROR');
                return setError({error: true, message: parsedRes.message})
            }
            console.log(parsedRes.body)
            return setPreviews(parsedRes.body);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //Profile Function
    const fetchProfilePreviews = async(p) => {
        setPreviews([]);
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/user/posts', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: localStorage.id,
                    profileUser: p,
                    limit: limit,
                    orderByVotes: orderByVotes
                })
            })

            const parsedRes = await response.json();
            if(response.status !== 200) {
                console.log('ERROR');
                return setError({error: true, message: parsedRes.message})
            }
            console.log(parsedRes)
            return setPreviews(parsedRes.body);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //Profile Function
    const fetchFrontpageFeed = async() => {
        setPreviews([]);
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/frontpage/feed', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: localStorage.id,
                    limit: limit,
                    sortByVote: orderByVotes
                })
            })
            const parsedRes = await response.json();
            if(response.status !== 200) {
                console.log('ERROR');
                return setError({error: true, message: parsedRes.message})
            }
            console.log(parsedRes.body)
            return setPreviews(parsedRes.body);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }    

    //useEffect
    useEffect(() => {
        if(subreddit) {
            return fetchSubredditPreviews(subreddit);
        } else if(profile) {
            return fetchProfilePreviews(profile);
        } else if(frontpage) {
            return fetchFrontpageFeed();
        }

    }, [limit, orderByVotes]);

    return (
        <div>
            { error.error ? <ErrorPanel message={error.message} /> : null}
            <div>
                <Button 
                    className='preview-button'
                    onClick={() => setOrderBy(false)}>
                    New
                </Button>
                <Button 
                    className='preview-button'
                    onClick={() => setOrderBy(true)}>
                    Top
                </Button>
            </div>
            {
                previews ?
                    previews.map((p, i) => (
                        <PostPreview
                            key = {i}
                            postId = {p.postId}
                            subreddit = {p.subreddit}
                            title = {p.title}
                            user = {p.user}
                            votes = {p.votes}
                            lastVote = {p.lastVote}
                            date = {p.date}
                            deleted = {p.deleted}
                        />
                    ))
                : <p>No posts yet</p>
            }

            {
                previews.length < 10 ? null :              
                    <Button
                        className='preview-button mb-5'
                        onClick = {() => setLimit(limit + 10)}
                    >
                        Load More
                    </Button>
            }

        </div>
    )
}

export default PostCollection;