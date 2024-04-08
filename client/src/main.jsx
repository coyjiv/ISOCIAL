//libs
import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { theme } from "./theme";
//routes
import { App } from "./views/routes/Routes";
//styles
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
//redux
import { store } from "./store";
import { Provider } from "react-redux";
//configs
import "../src/lib/firebase/firebaseConfig";

import * as Sentry from "@sentry/react";
import { API_URL } from "./api";

Sentry.init({
  dsn: "https://f7a0efcc6134952d98c801c8f73d2a35@o4507007176867840.ingest.us.sentry.io/4507007180931072",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", API_URL],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>,
);
