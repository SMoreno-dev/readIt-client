import React from 'react';

import Votes from '../Votes/Votes';
import Comment from '../Comment/Comment';

import './Post.css';

const Post = () => {
    return (
        <div className='post-component'>
            <div className='post-container'>
                <Votes />
                <div className='post'>
                    <h1 className='post-title'>Lorem Ipsum</h1> 
                    <p className='post-user'>by User</p>
                    <div className='post-body'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt blandit lacus id aliquam. Etiam vel rutrum neque, dictum pulvinar ipsum. Donec accumsan, augue ac luctus luctus, magna diam porta augue, sit amet accumsan erat elit a est. Mauris ac nunc gravida orci luctus lacinia ac id diam. Nulla arcu magna, mattis non finibus nec, tincidunt in urna. Mauris malesuada nisl ac neque elementum tincidunt. In sollicitudin ultricies eros id tempus. Donec non risus quis purus consectetur tincidunt. Quisque vitae purus felis. Pellentesque vel magna nibh. Nullam placerat nisl id sem mattis, id luctus mauris viverra. Praesent ultrices dolor sed turpis sollicitudin molestie. In consectetur, lorem vel lobortis ultricies, nunc mauris ultricies nulla, in interdum libero quam quis ipsum. Donec posuere condimentum orci et tristique. Phasellus nec feugiat tortor.
                            Etiam sed odio nec lectus scelerisque tincidunt at ac ex. Ut tincidunt ligula in mi elementum, eu posuere erat facilisis. Vestibulum id ullamcorper nulla. Pellentesque interdum vitae nisi sit amet euismod. Donec condimentum eu erat vitae porta. Cras quis vulputate quam. Suspendisse sapien est, ornare vitae felis non, luctus molestie quam. Nam eget quam feugiat, volutpat orci a, mattis mauris. Nulla eu elementum tellus. Ut consequat diam odio, et ullamcorper lacus rhoncus non. Nunc lorem tortor, lobortis ac nisi condimentum, fermentum volutpat mauris. Nam a diam in urna aliquam pulvinar sed nec nisi. Fusce dictum arcu ipsum, sed ultricies dolor sodales in. Mauris bibendum porttitor fermentum. Mauris sed libero maximus, semper enim quis, suscipit lacus. In nisi leo, varius ac venenatis ac, euismod id tellus.
                        </p>
                    </div>
                </div>
            </div>
            <Comment />
        </div>

    )
}

export default Post;