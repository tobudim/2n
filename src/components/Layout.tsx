import React, { FunctionComponent, ReactElement } from 'react';
import { Router } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Home from './Home';
import Ranking from './Ranking';
import More from './More';

const Layout: FunctionComponent = (): ReactElement => {
  useTranslation();
  return (
    <div id="layout">
      <Header />
      <div id="router-wrapper" className="px-4">
        <Router>
          <Home path="/" />
          <Ranking path="ranking" />
          <More path="more" />
        </Router>
      </div>
    </div>
  );
};

export default Layout;