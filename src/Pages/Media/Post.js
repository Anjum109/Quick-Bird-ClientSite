import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Post = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // const imageStorageKey = '4295ac4d47b569312bea67b440cdbdbb';

    const handleAddPost = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const doctor = {
                        name: data.name,
                        image: imgData.data.url
                    }

                    // save doctor information to the database
                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);

                        })
                }
            })
    }


    return (
        <div className='p-7'>
            <form onSubmit={handleSubmit(handleAddPost)}>
                <div className="form-control w-96 h-3/6 mb-5 max-w-xs">
                    <textarea type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-96 max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <input className='btn btn-accent w-50 mt-4' value="Post" type="submit" />
            </form>
        </div>
    );
};

export default Post;






















// import React, { useContext } from 'react';
// import { toast } from 'react-hot-toast';
// import { AuthContext } from '../../Context/AuthProvider/Authprovider';

// const Post = () => {

//     const { user } = useContext(AuthContext);

//     const notify = () => toast("Successfully added")
//     const imageHostKey = process.env.REACT_APP_imgbb_key;
//     console.log(imageHostKey);

//     const handlePost = event => {
//         event.preventDefault();
//         const form = event.target;
//         const image = form.image.value;
//         const description = form.description.value;
//         console.log(image, description);

//         const media = {
//             image, description
//         }
//         fetch('http://localhost:5000/posts', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(media)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//                 if (data.acknowledged) {

//                     form.reset();
//                 }
//             })
//             .catch(error => console.error(error))
//     }


//     return (
//         <div>
//             <div className='mt-12 bg-neutral-600 p-5 grid grid-cols-1 gap-6'>

//                 <form className='lg:mx-28' onSubmit={handlePost}>

//                     <textarea name="description"
//                         type="text"
//                         placeholder="Type Service description"
//                         className="input mb-5 input-bordered w-full h-36" />
//                     <div>

//                         <input type="file"
//                             accept='image/*'
//                             name="image"
//                             required='Photo is required'
//                             placeholder="Service name" defaultValue=""
//                             className="input input-bordered w-full mb-5" />
//                         <button type="submit" onClick={notify} className="input text-black input-bordered w-full" value="Add Service">
//                             Post</button> </div>

//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Post;