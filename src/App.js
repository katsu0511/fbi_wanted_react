import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Wanted from './Wanted.js';
import Loading from './Loading.js';
import Error from './Error.js';

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
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<Error />}>
          <QueryClientProvider client={cli}>
            <Wanted />
          </QueryClientProvider>
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}

export default App;
