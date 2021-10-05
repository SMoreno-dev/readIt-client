import React, { useEffect, useState } from "react";

import "./SubredditList.css";
import { Link } from "react-router-dom";

import ErrorPanel from '../../ErrorPanel/ErrorPanel';

const SubredditList = () => {
    //State
    const [error, setError] = useState({error: false, message: ''});
    const [subreddits, setSubreddits] = useState([]);

    //useEffect Function
    const fetchSubreddits = async() => {
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/subreddit/list', {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            })

            const parsedRes = await response.json()
            if(response.status !== 200) {
                return setError({
                    error: true,
                    message: parsedRes.message
                })
            }
            setSubreddits(parsedRes.body)

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    useEffect(() => fetchSubreddits());

    return(
        <div className='s-list-box'>
        { error.error ? <ErrorPanel message={error.message} /> : null}

            <h2>List of subreddits</h2>

            <div className='s-list-body'>
            {
                subreddits.map((s, i) => (
                    <div className='s-list-element'>
                        <Link
                            className='s-list-link'
                            to={`r/${s.title}`}>
                                {s.title}
                        </Link>
                        <p className='s-list-link-info'>
                            {s.info}
                        </p>
                    </div>    
                ))
            }
            </div>
        </div>
    )
}

export default SubredditList;