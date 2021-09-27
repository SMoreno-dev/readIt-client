import React from 'react';

import SmallVotes from '../SmallVotes/SmallVotes';
import { Link } from 'react-router-dom';

import './PostPreview.css';

const PostPreview = ({postId, subreddit, title, user, date, votes, lastVote}) => {
    return(
        <div className='preview-container'>
            <div className='preview-box'>
                <SmallVotes 
                    votes={votes}
                    value={lastVote}
                    postId={postId}
                />

                <div className='preview-title-details'>
                    <Link 
                        className='preview-title'
                        to={`/r/${subreddit}/post=${postId}`}>
                        {title}
                    </Link>

                    <br />

                    <p className='preview-details'>
                    submitted to <Link to={`/r/${subreddit}`}>{subreddit + " "}</Link> 
                    by <Link to={`/user/${user}`}>{user}</Link> {`at ${date.slice(0,10) + " " + date.slice(11, 19)}`} 
                    </p>
                </div>

            </div>
        </div>
    )
}

export default PostPreview;