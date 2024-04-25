import React, { useState } from 'react';

const SearchPosts = ({ handleSearch }) => {
     const [searchValue, setSearchValue] = useState('');

     const handleChange = (e) => {
          setSearchValue(e.target.value);
          handleSearch(e.target.value);
     };

     return (
          <form>
               <div className="search-container">
                    <input
                         type="text"
                         placeholder="Search..."
                         value={searchValue}
                         onChange={handleChange}
                    />
               </div>
          </form>
     );
};

export default SearchPosts;