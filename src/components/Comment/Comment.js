import React, {useState} from 'react';
import './Comment.css';

const Comment = () => {
    const [hidden, setHidden] = useState(false)

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
                    <p className='comment-detail'>Noobmaster69 120 points</p>
                </div>

                <div className={!hidden ? '' : 'comment-hidden'}>
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus sed ante at neque facilisis semper ac eget velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam lacinia dictum iaculis. Etiam in suscipit diam, in volutpat lacus. Integer mattis metus ut volutpat iaculis. Proin posuere justo massa, a luctus sapien hendrerit vitae. Aliquam tincidunt lacus non hendrerit gravida. Nulla facilisi. Sed malesuada consequat magna at suscipit. Pellentesque bibendum et lacus a rutrum. Donec eget laoreet nibh, ac elementum nibh. Morbi quis ornare sapien, gravida aliquet ex. Ut sit amet magna arcu. Quisque velit nunc, tincidunt non magna ac, viverra pretium magna.</p>
                    <div className='comment-actions'>
                        <p className='comment-detail'>reply</p>
                        <p className='comment-detail'>delete</p>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Comment;