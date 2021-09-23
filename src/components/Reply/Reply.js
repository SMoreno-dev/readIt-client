import React, {useEffect, useState} from 'react';

import Comment from '../Comment/Comment';
import ErrorPanel from '../ErrorPanel/ErrorPanel';

import './Reply.css';

const Reply = ({id}) => {

    //State
    const [error, setError] = useState({error: false, message: ''});
    const [replyData, setReplyData] = useState(null);

    //useEffect Function
    const getReplies = async (commentId) => {
        try {
            const response = await fetch('http://localhost:3000/comment/get-replies', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    commentId,
                    userId: localStorage.id
                })
            })

            const parsedRes = await response.json();
            if(response.status !== 200) {
                return setError({error: true, message: parsedRes.message});
            }

            setReplyData(parsedRes.body)

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    useEffect(()=> getReplies(id), []);

    return (
        <div>
            { error.error ? <ErrorPanel message={error.message} /> : null}

            { 
                !replyData 
                    ? null
                    : replyData.map(data => (
                        <Comment 
                            id={data.newCommentId}
                            user={data.user}
                            body={data.body}
                            date={data.created}
                            canDelete={data.canDelete}
                        /> 
                    ))   
            }
        </div>
    )
}

export default Reply;