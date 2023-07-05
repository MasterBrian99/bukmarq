import { withErrorHandler } from "@/error-handling";
import AppErrorBoundaryFallback from "@/error-handling/fallbacks/App";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import axios, { AxiosContext } from "./utils/axios";
import theme from "./theme/theme";
import { useLocalStorage } from "@mantine/hooks";

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

console.log(process.env.NODE_ENV);
const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <AxiosProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{ ...theme, colorScheme }}
              withGlobalStyles
              withNormalizeCSS
            >
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </MantineProvider>
          </ColorSchemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </AxiosProvider>
  );
};

export default withErrorHandler(App, AppErrorBoundaryFallback);
