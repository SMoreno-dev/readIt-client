import React from 'react';
import {connect} from 'react-redux';

import {setVote} from "../../redux/actions/voteActions";

import './Votes.css';

const Votes = ({status, setVote, currentVotes}) => {

    const upvoteHandler = () => {
        switch(status) {
            case true:
                setVote('UNDO_UP');
                break;
            case false:
                setVote('UNDO_DOWN');
                setVote('UP');
                break;
            case null:
                setVote('UP');
                break;
            default:
                throw new Error();
        }
    }

    const downvoteHandler = () => {
        switch(status) {
            case false:
                setVote('UNDO_DOWN');
                break;
            case true:
                setVote('UNDO_UP');
                setVote('DOWN');
                break;
            case null:
                setVote('DOWN');
                break;
            default:
                throw new Error()
        }
    }

    return(
        <div className="vote-body">
            <p 
                className={status === true ? 'up' : '' }
                onClick={() => upvoteHandler()}>
                ↑
            </p>
            <p className="votes">{currentVotes}</p>
            <p 
                className={status === false ? 'down' : '' }
                onClick={() => downvoteHandler()}>
                ↓
            </p>
        </div>
    )
}

const mapStateToProps = ({votes}) => ({
    currentVotes: votes.upvoted - votes.downvoted,
    status: votes.status
})

const mapDispatchToProps = dispatch => ({
    setVote: (type) => dispatch(setVote(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Votes);