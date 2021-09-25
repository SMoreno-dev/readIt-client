import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import TextArea from '../TextArea/TextArea';
import ErrorPanel from '../ErrorPanel/ErrorPanel';
import { Button } from 'react-bootstrap';


import './CreateReply.css';

const CreateReply = ({commentId, reply}) => {
    //Error State
    const [error, setError] = useState({error: false, message: ''});

    //Submit Comment
    const handleSubmit = async() => {
        try {
            if(!localStorage.id) {
                return <Redirect to='/signin' />
            }

            if (reply.length === 0) {
                return setError({
                    error: true,
                    message: 'Reply must include some text'
                })
            }

            const response = await fetch('http://localhost:3000/comment/submit-reply', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    prevCommentId: commentId,
                    reply,
                    userId: localStorage.id
                })
            })

            const parsedRes = await response.json()

            if(response.status !== 200) {
                console.log(parsedRes.message)
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

    //Not logged in
    if(!localStorage.id) {
        return <Redirect to='/signin'/>;
    } 
    
    return(
        <div className='create-comment'>
            {/* Error Panel */}
            { error.error ? <ErrorPanel message={error.message} /> : null}

            <div className='comment-input-box'>
                <TextArea 
                    title='Reply'
                    name='comment-input'
                    limit={5000}
                    cols="5000"
                    rows="5"
                    className='comment-input'
                />

                <Button 
                    className='comment-button'
                    variant="secondary"
                    onClick={handleSubmit}>
                        Submit    
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    reply: state.user.text
})

export default connect(mapStateToProps)(CreateReply);