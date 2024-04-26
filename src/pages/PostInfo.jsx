import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import PostComments from './PostComments';

const PostInfo = () => {
     const { id } = useParams();
     const [post, setPost] = useState(null);
     const [imageStatus, setImageStatus] = useState(false);
     const [comments, setComments] = useState([]);
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
                    console.error('Error fetching comments:', error.message);
               } else {
                    setPost(data);
                    setLoading(false);
               }
          };

          const fetchComments = async () => {
               const { data, error } = await supabase
                    .from('Comments')
                    .select()
                    .eq('post_id', id);
     
               if (error) {
                    console.error('Error fetching comments:', error.message);
               } else {
                    setComments(data || []);
               }
          };

          fetchPost();
          fetchComments();
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
                              <p><strong>Title:</strong> {post.title}</p>
                              <p><strong>Description:</strong> {post.description}</p>
                              <div className="post-info-img">
                                   {post.image_URL !== '' && !imageStatus && (
                                        <img src={post.image_URL} onError={handleImageStatus} alt="Post Image"/>
                                   )}
                                   {(imageStatus || post.image_URL === '') && (
                                        <p style={ { color: '#888' } }>[No image provided or incorrect image URL]</p>
                                   )}
                              </div>
                         </div>
                         <div className="comment-container">
                              <h3>Comments</h3>
                              <div className="comments">
                                   {comments.length === 0 ? (
                                        <p style={{color: '#888', textAlign: 'center' }}>No comments added yet</p>
                                   ) : (
                                        comments.map((comment) => (
                                             <div className="comment" key={comment.id}>
                                                  <p>- {comment.comment}</p>
                                             </div>
                                        ))
                                   )}
                              </div>
                              <div className="add-comment">
                                   <PostComments postId={id} />
                              </div>
                         </div>
                         <Link to="/viewPosts" style={{ marginRight: "850px", color: "black" }}>Back</Link>
                    </div>
               )}
          </div>
     );
};

export default PostInfo;
