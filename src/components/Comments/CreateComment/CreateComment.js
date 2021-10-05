import React, { useState } from 'react';

//Redux
import { connect } from 'react-redux';
import { setText } from '../../../redux/actions/userActions';

//Router
import { withRouter, useHistory } from 'react-router';

import TextArea from '../../TextArea/TextArea';
import ErrorPanel from '../../ErrorPanel/ErrorPanel';
import { Button } from 'react-bootstrap';


import './CreateComment.css';

const CreateComment = ({postId, comment, setText}) => {
    //Error State
    const [error, setError] = useState({error: false, message: ''});

    //History
    const history = useHistory();

    //Submit Comment
    const handleSubmit = async() => {
        try {

            if (comment.length === 0) {
                return setError({
                    error: true,
                    message: 'Comment must include some text'
                })
            }

            const response = await fetch('https://readit-server-1.herokuapp.com/comment/submit-comment', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    postId,
                    comment,
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

            setText('');
            window.location.reload();

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    return(
        <div className='create-comment'>
            {/* Error Panel */}
            { error.error ? <ErrorPanel message={error.message} /> : null}

            <div className='comment-input-box'>
                <TextArea 
                    title='Leave a comment'
                    name='comment-input'
                    limit={5000}
                    cols="5000"
                    rows="5"
                    className='comment-input'
                />

                <Button 
                    className='comment-button'
                    variant="secondary"
                    onClick={!localStorage.id ? () => history.push("/signin") : handleSubmit}>
                        Submit    
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    comment: state.user.text
})

const mapDispatchToProps = dispatch => ({
    setText: (text) => dispatch(setText(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateComment))