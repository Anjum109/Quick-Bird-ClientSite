import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/Authprovider';
import CommentList from './CommentList';

const AddComment = () => {

    const { user } = useContext(AuthContext);


    const handleAddComment = event => {
        event.preventDefault();
        const form = event.target;
        const comment = form.comment.value;

        console.log(comment);

        const comments = {
            comment
        }
        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comments)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {

                    form.reset();
                }
            })
            .catch(error => console.error(error))
    }


    return (
        <div>
            <div className='bg-neutral-600 grid grid-cols-1'>

                <form className='m-3' onSubmit={handleAddComment}>

                    <textarea name="comment"
                        type="text"
                        placeholder="Add a Comment"
                        className="input mb-5 input-bordered w-full h-28" />

                    <div> <button type="submit" className="input text-black bg-teal-500 input-bordered w-full" value="Add Comment">
                        Comment</button> </div>

                </form>
            </div>
            <CommentList></CommentList>
        </div>
    );
};

export default AddComment;