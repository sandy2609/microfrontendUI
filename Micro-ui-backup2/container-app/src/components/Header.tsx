import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='appName'>
        <Link to="/"><h1>Micro Frontend App</h1></Link>
      </div>

    </header>
  );
};

export default Header;
