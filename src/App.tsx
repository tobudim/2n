import React, {
  FunctionComponent,
  ReactElement,
  Suspense,
  useEffect,
} from 'react';
import { useCookies } from 'react-cookie';
import style from 'styled-components';

import { firestore } from './firebase.js';
import Layout from './components/Layout';
import Loader from './components/Loader';

const SoftTheme = style.div`
  background-color: #955656;
  color: white;

  h1, h2 {
    color: white;
  }

  a {
    color: white;
    text-decoration: underline;
    border: none;
    transition: font-weight 0s ease-in;
  }
  a:hover {
    border: none;
    font-weight: bold:
  }
  
  section, ul {
    background-color: #523434;
  }

  header {
    background: #955656;
  }
  header a {
    text-decoration: none;
    border-bottom: 2px solid transparent;
  }
  header a:hover {
    border-bottom: 2px solid white;
  }
  header ul {
    background-color: transparent;
  }

  footer ul {
    background-color: transparent;
  }

  .cookie {
    color: black;
  }
`;
const DarkTheme = style(SoftTheme)`
  background-color: #292727;

  header {
    background: #292727;
  }

  section {
    background-color: #955656;
  }
`;
const DisplayApp: FunctionComponent = (): ReactElement => (
  <Suspense fallback={<Loader />}>
    <Layout />
  </Suspense>
);

const App: FunctionComponent = (): ReactElement => {
  const [cookies] = useCookies();

  useEffect(() => {
    const getRanking = async () => {
      const snapshot = await firestore.collection('ranking').get();
      snapshot.forEach(doc => {
        const { id } = doc;
        const data = doc.data();
        console.log(id, data);
      });
    };
    getRanking();
  });

  if (typeof cookies.theme !== 'undefined') {
    if (cookies.theme === 'soft') {
      return (
        <SoftTheme>
          <DisplayApp />
        </SoftTheme>
      );
    }
    if (cookies.theme === 'dark') {
      return (
        <DarkTheme>
          <DisplayApp />
        </DarkTheme>
      );
    }
  }

  return <DisplayApp />;
};

export default App;
