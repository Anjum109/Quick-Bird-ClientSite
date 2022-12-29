import React from 'react';

const CommentsDistructure = ({ comments }) => {

    const { comment } = comments;
    return (
        <div>
            <h1 className='border border-gray-700 mx-5 mb-1 px-3 py-2'>{comment}</h1>
        </div>
    );
};

export default CommentsDistructure;