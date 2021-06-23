import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorPanel from '../ErrorPanel/ErrorPanel';

import './Votes.css';

const Votes = () => {

    //State
    const [error, setError] = useState({error: false, message: ''});
    const [status, setStatus] = useState(null);
    const [currentVotes, setVotes] = useState(0);
    const [percentage, setPercentage] = useState(null);

    //Params
    const userId = localStorage.id;
    const {postId} = useParams();

    //useEffect function
    const fetchVotes = async() => {
        try {
            const response = await fetch('http://localhost:3000/post/votes', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userId,
                    postId: postId
                })
            })

            const parsedRes = await response.json();

            if(response.status !== 200) {
                return setError({
                    error: true,
                    message: parsedRes.message
                })
            }
            setStatus(parsedRes.body.status);
            setVotes(parsedRes.body.votes);
            setPercentage(parsedRes.body.percentage);
            return;

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => fetchVotes(), [])

    //Submit votes
    const submitVote = async (boolean) => {
        try {
            const response = await fetch('http://localhost:3000/post/vote', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                    vote: boolean
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
        await submitVote(true);
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
        await submitVote(false);
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


    return(
        <div className="vote-body">
            { error.error ? <ErrorPanel message={error.message} /> : null}
            <p 
                className={status === true ? 'up' : '' }
                onClick={() => upvoteHandler()}
            >
                ↑
            </p>
            <p className="votes">{currentVotes}</p>
            <p 
                className={status === false ? 'down' : '' }
                onClick={() => downvoteHandler()}
            >
                ↓
            </p>
            <p
                className={percentage === null ? 'percentage-hidden' : 'percentage-upvoted'}
            >
                {`${percentage}% upvoted`}
            </p>
        </div>
    )
}


export default Votes;