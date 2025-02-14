import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Wanted from './Wanted.js';

const cli = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <main>
      <header>
        <h1>FBI Wanted Criminals</h1>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<div>Error has happened.</div>}>
          <QueryClientProvider client={cli}>
            <Wanted />
          </QueryClientProvider>
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}

export default App;
