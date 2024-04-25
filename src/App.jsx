import './App.css';
import { React, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import ViewPosts from './pages/ViewPosts';
import EditPost from './pages/EditPost';
import PostInfo from './pages/PostInfo';
import SearchPosts from './pages/SearchPosts';

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleNavSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/"><button className='nav-title'><strong>Dog Show</strong></button></Link>
          <SearchPosts handleSearch={handleNavSearch} />
          <Link to="/create"><button className='nav-title'>Create Post</button></Link>
          <Link to="/viewPosts"><button className='nav-title'>View All Posts</button></Link>
        </nav>
        {/* <div className="header">
          <h1>Dog Show</h1>
          <p>The app to show off your Dogs!</p>
        </div> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/viewPosts" element={<ViewPosts searchValue={searchValue} />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
