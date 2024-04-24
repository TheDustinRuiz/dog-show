import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import ViewPosts from './pages/ViewPosts';
import EditPost from './pages/EditPost';
import PostInfo from './pages/PostInfo';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/"><button className='title'><strong>Dog Show</strong></button></Link>
          <Link to="/create"><button>Create Post</button></Link>
          <Link to="/viewPosts"><button>View All Posts</button></Link>
        </nav>
        {/* <div className="header">
          <h1>Dog Show</h1>
          <p>The app to show off your Dogs!</p>
        </div> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/viewPosts" element={<ViewPosts />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
