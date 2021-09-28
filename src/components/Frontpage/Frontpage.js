import React from "react";
import PostCollection from "../Posts/PostCollection/PostCollection";

const Frontpage = () => {
    return (
        <div className='m-5'>
            <PostCollection frontpage={true} />
        </div>
    )
}

export default Frontpage;