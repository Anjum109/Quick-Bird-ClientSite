import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';
import AddComment from './AddComment';

const PostDistructure = ({ post }) => {
    const { image, name, _id } = post;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
                <PhotoProvider>
                    <PhotoView src={image}>
                        <img src={image} alt="" />
                    </PhotoView>
                </PhotoProvider>
            </figure>
            <div className="card-body">


                <div className="card-actions justify-end">
                    <p>{name}</p>
                    {/* <p className='text-justify'>{name.slice(0, 100)}</p>
                    <Link to={`/postdetails/${_id}`}>
                        <button>see more</button>
                    </Link> */}
                </div>
            </div>
            <div>
                <AddComment></AddComment>
            </div>
        </div>
    );
};

export default PostDistructure;