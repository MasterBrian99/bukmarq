import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Notifications } from '@mantine/notifications';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from 'react-auth-kit';
import Router from './routes/Router';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import { withErrorHandler } from '@/error-handling';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient} contextSharing>
    <ReactQueryDevtools initialIsOpen={false} />
    <RecoilRoot>
      <Notifications position="top-right" />
      <AuthProvider authType="localstorage" authName="_auth">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

export default withErrorHandler(App, AppErrorBoundaryFallback);
