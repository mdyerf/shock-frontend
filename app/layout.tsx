import * as React from "react";
import { AppProvider } from "@toolpad/core/nextjs";
import PivotTableChartIcon from "@mui/icons-material/PivotTableChart";
import type { Navigation } from "@toolpad/core/AppProvider";
import theme from "../theme";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import AppHeader from "./components/AppHeader";

const NAVIGATION: Navigation = [
  {
    title: "Integration",
    segment: "integration",
    pattern: "integration/:id?",
    icon: <PivotTableChartIcon />,
  },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-toolpad-color-scheme="dark">
      <body>
        <AppProvider theme={theme} navigation={NAVIGATION}>
          <DashboardLayout
            slots={{
              appTitle: AppHeader,
            }}
          >
            <PageContainer breadcrumbs={[]}>{children}</PageContainer>
          </DashboardLayout>
        </AppProvider>
      </body>
    </html>
  );
}
