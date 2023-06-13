import { withErrorHandler } from "@/error-handling";
import AppErrorBoundaryFallback from "@/error-handling/fallbacks/App";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import axios, { AxiosContext } from "@/utils/axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
});
const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => axios, []);

  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};

const App = () => {
  return (
    <AxiosProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>
    </AxiosProvider>
  );
};

export default withErrorHandler(App, AppErrorBoundaryFallback);
