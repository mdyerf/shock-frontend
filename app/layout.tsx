import * as React from "react";
import { AppProvider } from "@toolpad/core";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import type { Navigation } from "@toolpad/core/AppProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import theme from "../theme";
import AppHeader from "./components/AppHeader";
import QueryProvider from "./components/QueryProvider";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 import

const NAVIGATION: Navigation = [
  {
    title: "Diffusion",
    segment: "diffusion",
    pattern: "diffusion{/:id}?",
    icon: <AccountTreeIcon />,
  },
  {
    title: "Datasets",
    segment: "integration",
    pattern: "integration{/:id}?",
    icon: <IntegrationInstructionsIcon />,
  },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-toolpad-color-scheme="dark">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AuthProvider>
            <ProtectedRoute>
              <QueryProvider>
                <AppProvider theme={theme} navigation={NAVIGATION}>
                  <DashboardLayout
                    slots={{
                      appTitle: AppHeader,
                    }}
                  >
                    <PageContainer title="" breadcrumbs={[]}>
                      {children}
                    </PageContainer>
                  </DashboardLayout>
                </AppProvider>
              </QueryProvider>
            </ProtectedRoute>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
