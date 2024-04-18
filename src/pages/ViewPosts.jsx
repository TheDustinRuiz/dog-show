import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { supabase } from '../client'; 

const ViewPosts = () => {
     const [posts, setPosts] = useState([]);

     useEffect(() => {
          const fetchPosts = async () => {
               const { data, error } = await supabase
                    .from('Posts')
                    .select()
                    .order('created_at', { ascending: true });

               if (error) {
                    console.error('Error fetching posts:', error.message);
               } else {
                    setPosts(data);
               }
          };

          fetchPosts();
     }, []);

     return (
          <div>
               <h2>All Posts</h2>
               <ul>
                    {posts.map((post) => (
                         <div key={post.id}><Link to={`/post/${post.id}`}>
                         <li className='list-item'>
                              <p><strong>{post.title}</strong></p>
                              <p>{post.upvotes_count} upvotes</p>
                         </li>
                         </Link>
                         <Link to={`/edit/${post.id}`}><button className="edit-post-btn">Edit Post</button></Link>
                         </div> 
                    ))}
               </ul>
          </div>
    );
};

export default ViewPosts;
