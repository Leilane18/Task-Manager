import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes/index.tsx";
import { ThemeProvider } from "styled-components";
import { appTheme } from "./styles/theme.ts";
import { GlobalStyles } from "./styles/Global.ts";
import { AuthProvider } from "./contexts/authContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      
      <AuthProvider>
        <ThemeProvider theme={appTheme}>
          <AppRoutes />
          <GlobalStyles />
        </ThemeProvider>
      </AuthProvider>
    
    </QueryClientProvider>
  </React.StrictMode>
);
