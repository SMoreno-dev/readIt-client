import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import ErrorPanel from '../../ErrorPanel/ErrorPanel';
import SubscribeButton from "../../SubscribeButton/SubscribeButton";
import PostCollection from "../../Posts/PostCollection/PostCollection";

import { Container, Row, Col } from "react-bootstrap";
import './Subreddit.css';


const Subreddit = () => {
    //State
    const [error, setError] = useState({error: false, message: ''});
    const [subredditData, setSubData] = useState({
        name: '',
        description: '',
        users: 0,
        createdAt: '',
        isSubscribed: false
    });

    //Subreddit url param
    const {subredditName} = useParams();

    //useEffect function
    const fetchSubreddit = async (subredditName) => {
        try {
            const response = await fetch('https://readit-server-1.herokuapp.com/subreddit/data', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    subredditName,
                    userId: localStorage.id
                })
            })
    
            const parsedRes = await response.json()
            if(response.status !== 200) {
                return setError({
                    error: true,
                    message: parsedRes.message
                })
            }
    
            const {subreddit, description, users, date, subscription} = parsedRes.body;
            setSubData({
                name: subreddit,
                description,
                users,
                createdAt: date,
                isSubscribed: subscription
            })

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    useEffect(() => fetchSubreddit(subredditName), []);

    return(
        <Container fluid className="subreddit-container">
            { error.error ? <ErrorPanel message={error.message} /> : null}
            
            <div className='subreddit-title'>
                <h1 
                    className="divider"
                    onClick={() => window.location.reload()}
                >
                    {subredditData.name}
                </h1>
            </div>

            <Row>
                <Col sm={9}>
                    <PostCollection subreddit = {subredditName} />
                </Col>

                <Col sm={3} className='subreddit-info'>
                    <div className='subscribe-and-title '>
                        <h2 
                            style={{display: 'inline', cursor: 'pointer'}}
                            onClick={() => window.location.reload()}
                        >
                            {subredditData.name}
                        </h2>
                        
                        {
                            !localStorage.id ? null 
                            : <SubscribeButton isSubscribed={subredditData.isSubscribed} />
                        }
                        

                    </div>

                    <hr className="divider"/>
                        <p>{subredditData.users} readers</p>
                        <p>{subredditData.description}</p>
                    <hr className="divider"/>
                        <p>created at {subredditData.createdAt.slice(0, 10)}</p>
                    <hr className="divider"/>
                        <Link to={`/reddit-clone-client/submit/${subredditName}`}>Submit a New Post</Link>
                </Col>
            </Row>

        </Container>
    )
}

export default Subreddit;