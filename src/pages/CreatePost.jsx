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
               <h2>Create New Dog Post!</h2>
               {showMessage && <p style={{ color:"#fff"}}>Post created successfully!</p>}
               <form className='form-container' autoComplete="off" onSubmit={createPost}>
                    <input
                         type="text"
                         id="title"
                         placeholder="Title 
                         (Including Dog name, Age, & Breed)"
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                         required
                    />

                    <textarea id="description" name="msg" rows="5" cols="50"
                         type="text"
                         style={{
                              padding: "10px",
                              width: "750px",
                              marginBottom: "20px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              resize: "none"
                          }}
                         placeholder="Description 
                         (Any more information about the dog, 
                         including socials and characteristics)"
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         required
                    ></textarea>

                    <input
                         type="text"
                         id="imageURL"
                         placeholder="Image URL (Optional)"
                         value={imageURL}
                         onChange={(e) => setImageUrl(e.target.value)}
                    />

                    <button type="submit">Create Post</button>
               </form>
          </div>
     );
};

export default CreatePost;
