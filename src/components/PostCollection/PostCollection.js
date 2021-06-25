import React, { useState, useEffect } from 'react';

import ErrorPanel from '../ErrorPanel/ErrorPanel';
import PostPreview  from '../PostPreview/PostPreview';

import { Button } from 'react-bootstrap';
import './PostCollection.css';

const PostCollection = ({subreddit}) => {
    //Error State
    const [error, setError] = useState({error: false, message: ''});
    const [previews, setPreviews] = useState([]);
    const [orderByVotes, setOrderBy] = useState(false)
    const [limit, setLimit] = useState(2);

    //useEffect Function
    const fetchPostPreviews = async(sub) => {
        try {
            const response = await fetch('http://localhost:3000/post/previews', {
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
            return setPreviews(parsedRes.body);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    useEffect(() => fetchPostPreviews(subreddit), [limit, orderByVotes]);

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
                    />
                ))
            }
            <Button
                className='preview-button mb-5'
                onClick = {() => setLimit(limit + 10)}
            >
                Load More
            </Button>
        </div>
    )
}

export default PostCollection;