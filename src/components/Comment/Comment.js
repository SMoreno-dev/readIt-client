import React, {useState} from 'react';
import CreateReply from '../CreateReply/CreateReply';
import Reply from '../Reply/Reply';
import './Comment.css';

const Comment = ({id, user, body, date, parentHidden}) => {
    const [hidden, setHidden] = useState(false);
    const [reply, setReply] = useState(false);

    if(parentHidden === true) {
        setHidden(true);
    }

    return(
        <div className='comment'>
            <div 
                className='comment-hide'
                onClick={!hidden ? () => setHidden(true) : () => setHidden(false)}
            >
                {!hidden ? <p>[-]</p> : <p>[+]</p>}
            </div>

            {/* <CommentVote /> */}

            <div className='comment-box'>
                <div className={!hidden ? 'comment-info' : 'comment-info info-hidden'}>
                    <p className='comment-data'>
                        <a className='comment-user'>{user}</a> 
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
                        <p className='comment-action'>delete</p>
                    </div>
                </div>
                { reply && !hidden ? <CreateReply commentId={id} /> : null }
                { !hidden ? <Reply id={id} /> : null }

            </div>
        </div>
    )
}

export default Comment;