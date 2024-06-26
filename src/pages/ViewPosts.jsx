import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { supabase } from '../client'; 
import moment from 'moment';

const ViewPosts = ( { searchValue }) => {
     const [posts, setPosts] = useState([]);
     const [sortBy, setSortBy] = useState('created_at');
     const [imageStatus, setImageStatus] = useState(false);

     useEffect(() => {
          const fetchPosts = async () => {
               let fetchedPosts = [];
               const { data, error } = await supabase
                    .from('Posts')
                    .select()
                    .order(sortBy, { ascending: false });

               if (error) {
                    console.error('Error fetching posts:', error.message);
               } else {
                    if(searchValue) {
                         fetchedPosts = data.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()));
                    } else {
                         fetchedPosts = data;
                    }
                    setPosts(fetchedPosts);
               }
          };

          fetchPosts();
     }, [sortBy, searchValue]);

     const handleSortBy = (value) => {
          setSortBy(value);
     };

     const handleImageStatus = () => {
          setImageStatus(true);
     };

     return (
          <div>
               <h2>All Posts</h2>
               <div className='sort-by'>
                    <label>Order By:</label>
                    <button onClick={() => handleSortBy("created_at")}>Newest</button>
                    <button onClick={() => handleSortBy("upvotes_count")}>Most Popular</button>
               </div>
               <div className="list-container">
                    <ul>
                         {posts.map((post) => (
                              <div key={post.id}><Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                                   <li className='list-item'>
                                        <p style={{ color: '#888', marginBottom: '15px' }}>Posted {moment.utc(post.created_at).local().startOf('seconds').fromNow()}</p>
                                        <div className="viewPosts-img">
                                             {post.image_URL !== '' && !imageStatus && (
                                                  <img src={post.image_URL} onError={handleImageStatus} alt="Post Image"/>
                                             )}
                                             {(imageStatus || post.image_URL === '') && (
                                                  <p style={ { color: '#888' } }>[No image provided or <br></br>incorrect image URL]</p>
                                             )}
                                        </div>
                                        <div className="viewPosts-info">
                                             <p><strong>{post.title}</strong></p>
                                             <p style={{marginTop: '15px' }}>{post.upvotes_count} upvotes</p>
                                        </div>
                                   </li>
                                   </Link>
                                   <Link to={`/edit/${post.id}`}><button className="edit-post-btn">Edit Post</button></Link>
                              </div> 
                         ))}
                    </ul>
               </div>
          </div>
    );
};

export default ViewPosts;
