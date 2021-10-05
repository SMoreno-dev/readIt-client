import React, {useState} from 'react';

import { Link } from 'react-router-dom';
import ErrorPanel from '../../ErrorPanel/ErrorPanel';
import CreateReply from '../CreateReply/CreateReply';
import Reply from '../Reply/Reply';

import './Comment.css';

const Comment = ({id, user, body, date, parentHidden, canDelete}) => {
    //State
    const [hidden, setHidden] = useState(false);
    const [reply, setReply] = useState(false);

    //Error State
    const [error, setError] = useState({error: false, message: ''});

    if(parentHidden === true) {
        setHidden(true);
    }

    const handleDelete = async() => {
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/comment/delete-comment', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: localStorage.id,
                    commentId: id
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

    return(
        <div className='comment'>
            { error.error ? <ErrorPanel message={error.message} /> : null}
            <div 
                className='comment-hide'
                onClick={!hidden ? () => setHidden(true) : () => setHidden(false)}
            >
                {!hidden ? <p>[-]</p> : <p>[+]</p>}
            </div>

            <div className='comment-box'>
                <div className={!hidden ? 'comment-info' : 'comment-info info-hidden'}>
                    <p className='comment-data'>
                        <Link 
                            className='comment-user'
                            to={!user === '[deleted]' ? `/user/${user}` : null}>
                                {user}
                        </Link>
                        {`, ${date.slice(0, 10)} T${date.slice (11, 19)}`}
                        </p>
                </div>

                <div className={!hidden ? '' : 'comment-hidden'}>
                    <p>{body}</p>
                    <div className='comment-actions'>
                        <p 
                            onClick={() => setReply(true)}
                            className='comment-action'>
                                reply
                        </p>

                        {
                            canDelete === true ?
                                <p 
                                onClick={() => handleDelete()}
                                className='comment-action'>
                                    delete
                                </p>
                            : null
                        }

                    </div>
                </div>
                { reply && !hidden ? <CreateReply commentId={id} /> : null }
                { !hidden ? <Reply id={id} /> : null }

            </div>
        </div>
    )
}

export default Comment;