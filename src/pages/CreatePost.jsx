import React, { useState } from 'react';
import { supabase } from '../client';

const CreatePost = () => {
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [upvotesCount, setUpvotesCount] = useState(0);
     const [imageURL, setImageUrl] = useState('');
     const [showMessage, setShowMessage] = useState(false);

     const createPost = async (event) => {
          event.preventDefault();

          await supabase
               .from('Posts')
               .insert({ title: title, description: description, upvotes_count: upvotesCount, image_URL: imageURL })
               .single();

          setShowMessage(true);

          setTitle('');
          setDescription('');
          setUpvotesCount(0);
          setImageUrl('');

          setTimeout(() => {
               setShowMessage(false);
          }, 2000);
     };

     return (
          <div>
               <h2>Create New Post</h2>
               {showMessage && <p>Post created successfully!</p>}
               <form className='form-container' autoComplete="off" onSubmit={createPost}>
                    <label htmlFor="title">Title:</label>
                    <input
                         type="text"
                         id="title"
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         required
                    />

                    <label htmlFor="description">Description:</label>
                    <input
                         type="text"
                         id="description"
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         required
                    />

                    <label htmlFor="imageURL">Image URL (Optional):</label>
                    <input
                         type="text"
                         id="imageURL"
                         value={imageURL}
                         onChange={(e) => setImageUrl(e.target.value)}
                         required
                    />

                    <button type="submit">Create Post</button>
               </form>
          </div>
     );
};

export default CreatePost;
