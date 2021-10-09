import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';

import ErrorPanel from '../../ErrorPanel/ErrorPanel';

import { Button } from 'react-bootstrap';
import './SubscribeButton.css';

const SubscribeButton = ({history, isSubscribed}) => {
    //Params
    const {subredditName} = useParams();

    //State
    const [error, setError] = useState({error: false, message: ''});
    const [subscribed, setSubscription] = useState(isSubscribed);
    
    //useEffect
    useEffect(() => setSubscription(isSubscribed), [isSubscribed])

    const postSubscription = async(boolean) => {
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/subreddit/subscribe', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    subreddit: subredditName,
                    userId: localStorage.id,
                    subscription: boolean
                })
            })

            const parsedRes = await response.json();
            if(response.status !==200) {
                return setError({
                    error: true,
                    message: parsedRes.message
                })
            }

        } catch (err) {
            console.log(err);
            throw err;
        }

    }

    const buttonHandler = () => {
        switch(subscribed) {
            case true:
                postSubscription(false);
                setSubscription(false);
                break;
            case false:
                postSubscription(true);
                setSubscription(true);
                break;
            default:
                throw new Error();
        }
    }

    const redirect = () => {
        return history.push('/signin');
    }

    return (
        <>
            { error.error ? <ErrorPanel message={error.message} /> : null}
            <Button
                className={subscribed ? 'join btn-primary shadow-none' : 'leave btn-danger shadow-none'}
                onClick={!localStorage.id ? () => redirect() : () => buttonHandler()}
                >
                <p>{!subscribed ? 'join' : 'leave'}</p>
            </Button>
        </>

    )
}

export default withRouter(SubscribeButton);