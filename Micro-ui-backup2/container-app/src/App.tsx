import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { injectReducer } from './store/mainStore';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import { registerApplication, start } from 'single-spa';
import ErrorBoundary from './components/ErrorBoundary';
import moduleConfig from './constant/moduleConfig';


declare global {
  interface Window {
    store: any;
    injectReducer: any;
  }
}
const ShellApp = () => {
  const [routesConfig, setRoutesConfig] = useState<{ path: string; name: string; }[]>([]);

  useEffect(() => {
    window.store = store;
    window.injectReducer = injectReducer;

    moduleConfig.forEach((module) => {
      if (module.enabled) {
        registerApplication(
          module.name,
          () => import(/* @vite-ignore */ `http://localhost:${module.port}/src/module.jsx`),
          location => location.pathname.startsWith(module.path)
        );
      }
    });
    start();
  }, []);
 
  useEffect(() => {
    const fetchRoutesConfig = () => {
      const config = moduleConfig.flatMap(module =>
        module.enabled ? 
          [{ path: module.path, name: module.name }] : []
      );
      setRoutesConfig(config);  
    };

    fetchRoutesConfig();
  }, []);

 
  return (
    <Provider store={store}> {}
    {}
      <Router>
        <ErrorBoundary> {}
          <Header />
          <div className="main-content">
            <Sidebar routes={routesConfig} />
            <div className="content-area">
              <TopBar />
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  {routesConfig.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      render={() => <div id={`${route.name}-root`}></div>} 
                    />
                  ))}
                </Switch>
              </Suspense>
            </div>
          </div>
          <Footer />
        </ErrorBoundary>
      </Router>
      {}
    </Provider>
  );
};

export default ShellApp;
