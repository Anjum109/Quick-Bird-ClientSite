import React, { useEffect, useState } from 'react';
import CommentsDistructure from './CommentsDistructure';

const CommentList = () => {

    const [allServices, setServices] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch('http://localhost:5000/comments')
            .then(res => res.json())
            .then(data => {
                setServices(data)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <div className='grid gap-6 grid-cols-1'>
                {
                    allServices.map(comments => <CommentsDistructure
                        key={comments._id}
                        comments={comments}
                    ></CommentsDistructure>)
                }
            </div>
        </div>
    );
};

export default CommentList;