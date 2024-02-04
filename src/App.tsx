import React from 'react';

import PageRouter from '@/routes';

import { GlobalStyles } from './styles';

function App() {
  return (
    <React.Suspense fallback={<>loading</>}>
      <GlobalStyles />
      <PageRouter />
    </React.Suspense>
  );
}

export default App;
