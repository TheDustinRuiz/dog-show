import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { supabase } from '../client';

const PostInfo = () => {
     const { id } = useParams();
     const [post, setPost] = useState(null);
     const [imageStatus, setImageStatus] = useState(false);
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

     const handleUpvote = async (postId, postUpvoteCount) => {

          await supabase
               .from('Posts')
               .update({ upvotes_count: (postUpvoteCount+1) })
               .eq('id', postId);

          setPost(prevPost => ({ ...prevPost, upvotes_count: prevPost.upvotes_count + 1 }));
     };

     const handleImageStatus = () => {
          setImageStatus(true);
     };

     return (
          <div>
               <h2>Post Info</h2>
               {loading && <p>Loading...</p>}
               {post && (
                    <div>
                         <div className="upvotes-info">
                              <p style={{ marginTop: '15px' }}>{post.upvotes_count} upvotes</p>
                              <button onClick={() => handleUpvote(post.id, post.upvotes_count)}>▲</button>
                         </div>
                         <div className="post-info">
                              <p>Title: {post.title}</p>
                              <p>Description: {post.description}</p>
                              <div className="post-info-img">
                              {post.image_URL !== '' && !imageStatus && (
                                   <img src={post.image_URL} onError={handleImageStatus} alt="Post Image"/>
                              )}
                              {(imageStatus || post.image_URL === '') && (
                                   <p>[No image provided or incorrect image URL]</p>
                              )}
                              </div>
                         </div>
                         <Link to="/viewPosts" style={{ marginRight: "850px", color: "black" }}>Back</Link>
                    </div>
               )}
          </div>
     );
};

export default PostInfo;
