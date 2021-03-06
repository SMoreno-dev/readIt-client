import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorPanel from '../../ErrorPanel/ErrorPanel';
import Votes from '../Votes/Votes';
import CommentCollection from '../../Comments/CommentCollection/CommentCollection';
import CreateComment from '../../Comments/CreateComment/CreateComment';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import './Post.css';


const Post = () => {
    //Params
    const { subredditName, postId } = useParams();

    //Error State
    const [error, setError] = useState({error: false, message: ''});

    //Post State
    const [postInfo, setPost] = useState({
        postUser: "",
        postTitle: "",
        postText: "",
        postDate: "",
        canDelete: false
    })
    const {postUser, postTitle, postText, postDate, canDelete} = postInfo;

    //useEffect function
    const fetchPost = async (sub, post) => {
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/post/', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    subredditName: sub,
                    postId: post,
                    userId: localStorage.id
                })
            })

            const parsedRes = await response.json();
            console.log(parsedRes)
            if(response.status !== 200) {
                console.log(parsedRes.message)
                return setError({
                    error: true,
                    message: parsedRes.message
                })
            }

            const { postUser, postTitle, postText, postDate, canDelete } = parsedRes.body;
            setPost({
                postUser,
                postTitle,
                postText,
                postDate,
                canDelete
            })
            
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }
    useEffect(() => fetchPost(subredditName, postId), []);

    //Delete handler
    const handleDelete = async() => {
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/post/', {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: localStorage.id,
                    postId
                })
            })

            const parsedRes = await response.json();

            if(response.status !== 200) {
                return setError({
                    error: true,
                    message: parsedRes.message
                })
            }

            console.log(parsedRes.message);
            window.location.reload();

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <Container className='post-component'>
            {/* Error Panel */}
            { error.error ? <ErrorPanel message={error.message} /> : null}

            <Link className="subreddit-link" to={`/r/${subredditName}`}>{subredditName}</Link>
            <hr className="divider"/>

            <div className='post-container'>
                <Votes 
                    userId={localStorage.id}
                    postId={postId}
                />

                <div className='post'>

                    <div className='post-details'>  
                        <p className='post-title' onClick={postTitle !== '[deleted]' ? () => window.location.reload() : null}>{postTitle}</p> 
                        <div className='post-user-date'>
                            <Link className='post-user' to={postUser !== '[deleted]' ? `/user/${postUser}` : '#'}>{postUser}</Link>
                            <p className='post-date'>{postDate.slice(0, 10)}</p>
                        </div>
                    </div>

                    <div className='post-body text-area'>
                        <p>
                            {postText}
                        </p>
                    </div>
                    {           
                        canDelete === true ?
                            <p 
                                onClick={() => handleDelete()}
                                className='delete-post'>
                                    delete
                            </p>
                        : null
                    }
                </div>
            </div>

            <CreateComment postId={postId}/>
            <CommentCollection postId={postId}/>

        </Container>
    )
}

export default Post;