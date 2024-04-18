import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const PostInfo = () => {
     const { id } = useParams();
     const [post, setPost] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchPost = async () => {
               setLoading(true);
               const { data, error } = await supabase
                    .from('Posts')
                    .select()
                    .eq('id', id)
                    .single();

               if (error) {
                    console.error('Error fetching posts:', error.message);
               } else {
                    setPost(data);
                    setLoading(false);
               }
          };

          fetchPost();
     }, [id]);

     return (
          <div>
               <h2>Post Info</h2>
               {loading && <p>Loading...</p>}
               {post && (
                    <div className="post-info">
                         <p>Title: {post.title}</p>
                         <p>Description: {post.description}</p>
                    </div>
               )}
          </div>
     );
};

export default PostInfo;
