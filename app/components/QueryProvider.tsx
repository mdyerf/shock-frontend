"use client";

import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function QueryProvider({children}: IProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
