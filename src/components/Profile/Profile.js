import React, {useState, useEffect} from "react";
import { useParams } from "react-router";

import ErrorPanel from '../ErrorPanel/ErrorPanel';
import PostCollection from "../Posts/PostCollection/PostCollection";
import { Link } from "react-router-dom";

import './Profile.css'

const Profile = () => {
    //Error State
    const [error, setError] = useState({error: false, message: ''});

    //Subscriptions state
    const [subscriptions, setSubscriptions] = useState([]);

    //Profile username
    const {user} = useParams();
    if(!user) {
        setError({
            error: true,
            message: 'User does not exist'
        })
    }
    
    //useEffect function
    const fetchSubscription = async() => {
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/user/subscriptions', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: user
                })
            })

            const parsedResponse = await response.json();
            console.log(parsedResponse)
            if(response.status !== 200) {
                console.log(parsedResponse.message)
                return setError({
                    error: true,
                    message: parsedResponse.message
                })

            } else {
                setSubscriptions(parsedResponse.body);
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    useEffect(() => fetchSubscription(), []);

    return(
        <> 
            { error.error ? <ErrorPanel message={error.message} /> : null}
            <div className='user-profile'>

                <div className='user-posts'>
                    <p 
                        onClick={() => window.location.reload()}
                        className='profile-title'
                        >{`Posts from ${user}`}
                    </p>
                    <PostCollection 
                        page = {{
                            type: false,
                            value: user
                        }} 
                    />
                </div>

                <div className='user-subscriptions'>
                    <div className='user-subscriptions-box'>
                        <p>A member of: </p>
                        <p>
                            {
                                !subscriptions[0] ? 'No subscriptions yet.'
                                : subscriptions.map((e, i) => (
                                    <Link 
                                        className={'user-subscription'}
                                        key={i} 
                                        to={`/r/${e}`}>
                                            {e}
                                    </Link>
                                ))   
                            }
                        </p>

                    </div>
                </div>
                
            </div>

        </>
    )
}

export default Profile;