import React, {useEffect, useState} from 'react';

import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ErrorPanel from '../ErrorPanel/ErrorPanel';

import './SubscribeButton.css';

const SubscribeButton = ({isSubscribed}) => {
    //Params
    const {subredditName} = useParams();

    //State
    const [error, setError] = useState({error: false, message: ''});
    const [subscribed, setSubscription] = useState(isSubscribed);
    
    //useEffect
    useEffect(() => setSubscription(isSubscribed), [isSubscribed])

    const postSubscription = async(boolean) => {
        try {
            const response = await fetch('http://localhost:3000/subreddit/subscribe', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    subreddit: subredditName,
                    userId: localStorage.id,
                    subscription: boolean
                })
            })

            const parsedRes = await response.json();
            console.log(parsedRes)
            if(response.status !==200) {
                return setError({
                    error: true,
                    message: parsedRes.message
                })
            }
            console.log(parsedRes.message);

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

    return (
        <>
            { error.error ? <ErrorPanel message={error.message} /> : null}
            <Button
                className={!subscribed ? 'join btn-primary shadow-none' : 'leave btn-danger shadow-none'}
                onClick={() => buttonHandler()}
                >
                <p>{!subscribed ? 'join' : 'leave'}</p>
            </Button>
        </>

    )
}

export default SubscribeButton;