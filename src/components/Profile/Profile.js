import React, {useState} from "react";
import { connect } from "react-redux";

import './Profile.css'

const Profile = ({user}) => {

    const [selected, select] = useState(null);
    //{selected} true = comment, false = Posts, null = none
    
    return(
        <> 
            <div className='user-profile'>
                <div className='profile-tabs'>
                    <p 
                        onClick={() => window.location.reload()}
                        className='profile-title'
                        >Test
                    </p>
                    <p 
                        className={selected ? 'selected-tab' : 'profile-tab'}
                        onClick={() => select(true)}
                        >Comments
                    </p>
                    <p 
                        className={selected === false ? 'selected-tab' : 'profile-tab'}
                        onClick={() => select(false)}
                        >Posts
                    </p>
                </div>
               
            </div>
        </>
    )
}

const mapDispatchToProps = state => ({
    user: state.user.user
})

export default connect(mapDispatchToProps)(Profile);