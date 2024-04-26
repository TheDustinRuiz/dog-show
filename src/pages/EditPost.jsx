import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = () => {
     const { id } = useParams();
     let navigate = useNavigate(); 
     const [post, setPost] = useState({
          title: '',
          description: '',
          image_URL: ''
     });

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

          navigate('/viewPosts');
     };

     const deletePost = async () => {
          await supabase
               .from('Posts')
               .delete()
               .eq('id', id);

          navigate('/viewPosts');
     };

     return (
     <div>
          <h2>Edit Post</h2>
          <form className='form-container' autoComplete="off" onSubmit={updatePost}>
               <label htmlFor="title">Title:</label>
               <input
                    type="text"
                    id="title"
                    placeholder="Title 
                    (Including Dog name, Age, & Breed)"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    required
               />
               <div>
                    <div>
                         <label htmlFor="description">Description:</label>
                    </div>
                    <textarea id="description" name="description" rows="5" cols="50"
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
                         including characteristics and socials)"
                         value={post.description}
                         onChange={(e) => setPost({ ...post, description: e.target.value })}
                         required
                    ></textarea>
               </div>
               <label htmlFor="description">Image URL:</label>
               <input
                         type="text"
                         id="imageURL"
                         placeholder="Image URL (Optional)"
                         value={post.image_URL}
                         onChange={(e) => setPost({ ...post, image_URL: e.target.value })}
               />
               <button className="submit-btn" type="submit-btn">Update Post</button>
               <button className='delete-btn' onClick={deletePost}>Delete Post</button>               
          </form>
     </div>
     );
};

export default EditPost;
