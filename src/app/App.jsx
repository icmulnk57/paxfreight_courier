import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
// ROOT THEME PROVIDER
import { MatxTheme } from "./components";
// ALL CONTEXTS
import SettingsProvider from "./contexts/SettingsContext";
import routes from "./routes";

import { Provider } from "react-redux";
import { store } from "./store";
import InternetStatusBar from "./components/InternetStatusBar";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";

export default function App() {
  const content = useRoutes(routes);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <SettingsProvider>
      <Provider store={store}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }}> 
        <MatxTheme>
          <CssBaseline />
          <InternetStatusBar />
          <div
            className={`transition-all duration-300 ${
              isOffline ? "filter blur-sm grayscale pointer-events-none" : ""
            }`}
          >
            {content}
          </div>
        </MatxTheme>
        </SnackbarProvider>
      </Provider>
    </SettingsProvider>
  );
}
