import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = () => {
     const { id } = useParams();
     const [post, setPost] = useState([]);

     useEffect(() => {
          const fetchPost = async () => {
               const { data, error } = await supabase
                    .from('Posts')
                    .select()
                    .eq('id', id)
                    .single();

               if (error) {
                    console.error('Error fetching posts:', error.message);
               } else {
                    setPost(data);
               }
          };

          fetchPost();
     }, [id]);

     const updatePost = async (event) => {
          event.preventDefault();

          await supabase
               .from('Posts')
               .update({ title: post.title, description: post.description, image_URL: post.image_URL })
               .eq('id', id); 

          window.location = "/read";
     };

     const deletePost = async () => {
          await supabase
               .from('Posts')
               .delete()
               .eq('id', id);

          history.push('/read');
     };

     return (
     <div>
          <h2>Edit Post</h2>
          <form className='form-container' autoComplete="off" onSubmit={updatePost}>
               <label htmlFor="title">Title:</label>
               <input
                    type="text"
                    id="title"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    required
               />   
               <label htmlFor="description">Description:</label>
               <input
                    type="text"
                    id="description"
                    value={post.description}
                    onChange={(e) => setPost({ ...post, description: e.target.value })}
                    required
               />
               <button type="submit-btn">Update Post</button>
               <button className='delete-btn' onClick={deletePost}>Delete Post</button>
          </form>
     </div>
     );
};

export default EditPost;
