import React, { useState, useEffect } from 'react';

import ErrorPanel from '../ErrorPanel/ErrorPanel';

import './SmallVotes.css';

const SmallVotes = ({postId, votes, value}) => {
    //State
    const [error, setError] = useState({error: false, message: ''});
    const [status, setStatus] = useState(null);
    const [currentVotes, setVotes] = useState(0);

    //useEffect
    useEffect(() => {
        setStatus(value);
        setVotes(votes);
    }, [setVotes])

    //Submit votes
    const submitVote = async (postId, value) => {
        try {
            const response = await fetch('http://localhost:3000/post/vote', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: localStorage.id,
                    postId: postId,
                    vote: value
                })
            })

            const parsedRes = await response.json();
            if(response.status !== 200) {
                return setError({
                    error: true,
                    message: parsedRes.message
                })
            } 

        } catch (error) {
            console.log(error);
            throw new Error();
        }
    } 

    //Vote Handlers
    const upvoteHandler = async () => {
        await submitVote(postId, true);
        switch(status) {
            //Already upvoted
            case true:
                setVotes(currentVotes - 1);
                return setStatus(null);

            //Already Downvoted
            case false:
                setVotes(currentVotes + 2);
                return setStatus(true);

            //No previous vote
            case null:
                setVotes(currentVotes + 1);
                return setStatus(true);
        
            //Shouldn't happen
            default:
                throw new Error();
        }
    }

    const downvoteHandler = async () => {
        await submitVote(postId, false);
        switch(status) {
            //Already upvoted
            case true:
                setVotes(currentVotes - 2);
                return setStatus(false);

            //Already Downvoted
            case false:
                setVotes(currentVotes + 1);
                return setStatus(null);

            //No previous vote
            case null:
                setVotes(currentVotes - 1);
                return setStatus(false);
        
            //Shouldn't happen
            default:
                throw new Error();
        }
    }

    return (
        <div className="small-vote-body">
            { error.error ? <ErrorPanel message={error.message} /> : null}
            <p 
                className={status === true ? 'small-up' : '' }
                onClick={!localStorage.id ? null : () => upvoteHandler()}
            >
                ↑
            </p>
            <p className="small-votes">{currentVotes}</p>
            <p 
                className={status === false ? 'small-down' : '' }
                onClick={!localStorage.id ? null : () => downvoteHandler()}
            >
                ↓
            </p>
        </div>
    )
}

export default SmallVotes;