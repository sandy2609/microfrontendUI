import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const favorites = useSelector((state: any) => state.app1.favorites);
    const navigate = useNavigate();
    return (
      <div>
        <h1>App 1 Dashboard</h1>
        <p>Welcome to the Dashboard page</p>
        <Link to="/list"  className='primary-button'>Go to List</Link> { }
          {/* <Link to="/list">Go to List</Link> Add /app1 prefix
     */}

    



        <ul className='items-list'>
                {favorites.map((item) => (
                    <li key={item.id}>
                        <div className='items-image'>
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/picsum/400/250'}
                            />
                        </div>
                        <div className='items-description'>
                            <h3>{item.title}</h3>
                            <p>ID: {item.id}</p>
                            
                        </div>
                    </li>
                ))}
            </ul>

      </div>
    );
  };

  export default Dashboard;