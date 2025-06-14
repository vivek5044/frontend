import React, { Suspense, lazy } from 'react';

const DefaultPage = lazy(() =>
  import('./pages/DefaultPage').then(module => ({ default: module.DefaultPage }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DefaultPage />
    </Suspense>
  );
}

export default App;
