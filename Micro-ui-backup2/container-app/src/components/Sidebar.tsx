import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ routes }) => {
  return (
    <aside className='sideBar'>
      <ul className='navList'>
        {routes.map((route) => (
          <li key={route.path}>
            <NavLink
              to={route.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              
            >
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
