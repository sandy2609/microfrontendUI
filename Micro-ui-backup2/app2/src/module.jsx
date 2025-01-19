import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18's createRoot API
import App2 from './App2';

export const mount = (props) => {
  return new Promise((resolve, reject) => {
    const mountPoint = document.getElementById('app2-root');
    if (!mountPoint) {
      const errorMessage = 'Mount point not found: #app2-root';
      resolve();
      return;
    }
    
    try {
      const root = ReactDOM.createRoot(mountPoint);  
      root.render(<App2 />);  
      resolve();  
    } catch (error) {
      reject(new Error('Error mounting App2 module'));  
    }
  });
};

export const unmount = (props) => {
  return new Promise((resolve, reject) => {
    const mountPoint = document.getElementById('app2-root');
    if (!mountPoint) {
      const errorMessage = 'Mount point not found: #app2-root during unmount';
      resolve();
      return;
    }

    try {
      ReactDOM.unmountComponentAtNode(mountPoint);
      resolve();
    } catch (error) {
      reject(new Error('Error unmounting App2 module'));
    }
  });
};
