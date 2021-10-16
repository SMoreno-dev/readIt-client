import React, { useState, useEffect } from 'react';

import ErrorPanel from '../../ErrorPanel/ErrorPanel';
import PostPreview  from '../PostPreview/PostPreview';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import './PostCollection.css';

const PostCollection = ({page}) => {
    const { type, value } = page;

    //Error State
    const [error, setError] = useState({error: false, message: ''});

    //Post collection state
    const [previews, setPreviews] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [orderByVotes, setOrderBy] = useState(false)
    const [limit, setLimit] = useState(10);


    const fetchPreviews = async() => {
        setPreviews([]);
        let body = {}
        let route = '';

        switch(type) {
            //Frontpage
            case null:
                body = {
                    userId: localStorage.id,
                    limit: limit,
                    sortByVote: orderByVotes
                }
                route = 'https://readit-server-1.herokuapp.com/frontpage/feed';
                break;
            
            //Profile
            case false:
                body = {
                    userId: localStorage.id,
                    profileUser: value,
                    limit: limit,
                    orderByVotes: orderByVotes
                }
                route = 'https://readit-server-1.herokuapp.com/user/posts'
                break;
            
            //Subreddit
            case true:
                body = {
                    userId: localStorage.id,
                    subredditName: value,
                    limit: limit,
                    orderByVotes: orderByVotes
                }
                route = 'https://readit-server-1.herokuapp.com/subreddit/feed'
                break;

            default: 
                throw new Error();
        }

        try {
            const response = await fetch(route, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
                
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
    useEffect(() => fetchPreviews(), [limit, orderByVotes]);

    return (
        <div>
            { error.error ? <ErrorPanel message={error.message} /> : null}
            <div>
                { type === null ? <h2 className='pb-2'>Your feed</h2>: null}
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
                type === null && loaded && !previews[0] ?
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
                    if (p.deleted === true && type === false) {
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