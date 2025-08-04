import * as React from "react";
import { AppProvider } from "@toolpad/core";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import type { Navigation } from "@toolpad/core/AppProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import theme from "../theme";
import AppHeader from "./components/AppHeader";
import QueryProvider from "./components/QueryProvider";

const NAVIGATION: Navigation = [
  // {
  //   title: "Integration",
  //   segment: "integration",
  //   pattern: "integration/:id?",
  //   icon: <PivotTableChartIcon />,
  // },
  {
    title: "Diffusion",
    segment: "diffusion",
    pattern: "diffusion/:id?",
    icon: <AccountTreeIcon />,
  },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-toolpad-color-scheme="dark">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
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
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
