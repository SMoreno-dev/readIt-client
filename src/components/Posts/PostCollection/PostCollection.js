import React, { useState, useEffect } from 'react';

import ErrorPanel from '../../ErrorPanel/ErrorPanel';
import PostPreview  from '../PostPreview/PostPreview';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import './PostCollection.css';

const PostCollection = ({frontpage, subreddit, profile}) => {
    //Error State
    const [error, setError] = useState({error: false, message: ''});

    //Post collection state
    const [previews, setPreviews] = useState([]);
    const [loaded, setLoaded] = useState(false);
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
            setPreviews(parsedRes.body);
            setLoaded(true);

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
            setPreviews(parsedRes.body);
            setLoaded(true);

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
            setPreviews(parsedRes.body);
            setLoaded(true);

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
                { frontpage ? <h2 className='pb-2'>Your feed</h2>: null}
                {!orderByVotes ? <p>Sorting by new</p> : <p>Sorting by top</p>}

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
                !loaded ? <p className='pb-2 pt-2'>Loading...</p> : null
            }

            {
                frontpage && loaded && !previews[0] ?
                    <div className='pt-5'>
                        <p>It seems you're not subscribed to any subreadIts yet.</p>
                        <Link to='/subreadits'>Check them out.</Link>
                    </div>
                : null
            }

            {
                !previews[0] ?
                    null
                : previews.map((p, i) => {
                    if (p.deleted === true && profile) {
                        return null;
                    }
                    return(
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
                        )
                    })
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