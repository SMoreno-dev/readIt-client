import React, {useState} from "react";
import { useParams } from "react-router";

import ErrorPanel from '../ErrorPanel/ErrorPanel';
import PostCollection from "../PostCollection/PostCollection";

import './Profile.css'

const Profile = () => {
    //Error State
    const [error, setError] = useState({error: false, message: ''});

    //Profile username
    const {user} = useParams();
    if(!user) {
        setError({
            error: true,
            message: 'User does not exist'
        })
    }
    
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
                    <PostCollection profile = {user} />
                </div>

            </div>

        </>
    )
}

export default Profile;