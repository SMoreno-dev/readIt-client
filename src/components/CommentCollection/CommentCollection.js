import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Comment from '../Comment/Comment';
import ErrorPanel from '../ErrorPanel/ErrorPanel';

import './CommentCollection.css';

const CommentCollection = ({postId}) => {
    //Error State
    const [error, setError] = useState({error: false, message: ''});
    //Comment previews state
    const [comments, setComments] = useState([]);

    //useEffect Function
    const fetchComments = async (postId) => {
        try {
            const response = await fetch('http://localhost:3000/comment/get-comments', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    postId,
                    userId: localStorage.id
                })
            })
            const parsedRes = await response.json();
            if(response.status !== 200) {
                return setError({error: true, message: parsedRes.message});
            }
            setComments(parsedRes.body);
            console.log(parsedRes.body)

        } catch (error) {
            console.log(error);
            throw error;
        }

    }
    useEffect(() => fetchComments(postId), []);

    return(
        <div>
            { error.error ? <ErrorPanel message={error.message} /> : null}
            {
                comments ?
                    comments.map(c => (
                        <Comment
                            key={c.id}
                            id={c.id}
                            user={c.user}
                            body={c.text}
                            date={c.date}
                            canDelete={c.canDelete}
                        />
                    ))
                : null
            }
        </div>
    )
}

export default CommentCollection;