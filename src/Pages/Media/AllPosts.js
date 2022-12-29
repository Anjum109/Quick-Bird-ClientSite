import React, { useEffect, useState } from 'react';

import PostDistructure from './PostDistructure';

const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/posts')
            .then(res => res.json())
            .then(data => {
                setAllPosts(data)
                setLoading(false)
            })
    }, [])

    return (


        <div className='grid gap-6 grid-cols-1 m-12'>

            {
                allPosts.map(post => <PostDistructure
                    key={post._id}
                    post={post}
                ></PostDistructure>)
            }

        </div>

    );
};

export default AllPosts;