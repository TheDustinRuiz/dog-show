import React, { useState } from 'react';
import { supabase } from '../client';

const PostComments = ( {postId }) => {
     const [comment, setComment] = useState('');

     const handleComment = async () => {
          if (comment.trim() === '') return;

          const { error } = await supabase
               .from('Comments')
               .insert({ comment: comment, post_id: postId})
               .single();
          
          if (error) {
               console.error('Error fetching posts:', error.message);
          } else {
               setComment('');
          }

          window.location = `/post/${postId}`;
     };

     return (
          <div className='add-comment-container'>
               <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Leave a comment...'
                    style={{
                         padding: "10px",
                         width: "750px",
                         marginBottom: "20px",
                         border: "1px solid #ccc",
                         borderRadius: "5px",
                         resize: "none"
                     }}
                    rows="2"
               />
               <button onClick={handleComment}>Add Comment</button>
          </div>
     );
};

export default PostComments;