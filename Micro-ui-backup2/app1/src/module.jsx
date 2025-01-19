import React from 'react';
import ReactDOM from 'react-dom/client';
import App1 from './App1';

export const mount = (props) => {
  return new Promise((resolve, reject) => {
    const mountPoint = document.getElementById('app1-root');
    if (!mountPoint) {
      const errorMessage = 'Mount point not found: #app1-root';
      resolve();
      return;
    }

    try {
      const root = ReactDOM.createRoot(mountPoint);
      root.render(<App1 />);
      resolve();
    } catch (error) {
      reject(new Error('Error mounting App1 module'));
    }
  });
};

export const unmount = (props) => {
  return new Promise((resolve, reject) => {
    const mountPoint = document.getElementById('app1-root');
    if (!mountPoint) {
      resolve();
      return;
    }

    try {
      ReactDOM.unmountComponentAtNode(mountPoint);
      resolve();
    } catch (error) {
      reject(new Error('Error unmounting App1 module'));
    }
  });
};
