import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';  
import ListPage from './components/List';  
import { Provider } from 'react-redux'; 
import './style/index.scss';
import app1Reducer from './store/app1Reducer';  

declare global {
  interface Window {
    store: any;  // Add the `store` property to the `window` object
    injectReducer: any;  // Add the `injectReducer` property to the `window` object
  }
}

const App1 = () => {
  const [store, setStore] = useState<any>(null); 

  useEffect(() => {

    window.injectReducer('app1', app1Reducer);
    setStore(window.store); 
  }, []);

  if (!store) {
    return <div>Loading...</div>; 
  }

  return (
    <Provider store={store}>  {/* Wrap App1 in Redux Provider */}
      <Router basename="/app1">
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Dashboard page */}
          <Route path="/list" element={<ListPage />} /> {/* List page */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App1;

