"use client";

import { useQuery } from "@tanstack/react-query";
import DiffusionDisplay from "../components/DiffusionDisplay";
import { getDiffusionGraph, getDiffusionTable } from "../services/iterations";
import { use } from "react";

interface IPageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: IPageProps) {
  const { id } = use(params);

  // Fetch graphs
  const {
    data: graphsData,
    isLoading: graphsLoading,
    isError: graphsError,
    error: graphsErrorObj,
  } = useQuery({
    queryKey: ["diffusionGraph", id],
    queryFn: () => getDiffusionGraph(id),
  });

  // Fetch table
  const {
    data: tableData,
    isLoading: tableLoading,
    isError: tableError,
    error: tableErrorObj,
  } = useQuery({
    queryKey: ["diffusionTable", id],
    queryFn: () => getDiffusionTable(id),
  });

  const loading = graphsLoading || tableLoading;
  const error = graphsError || tableError;

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div style={{ color: "red" }}>
        Error:{" "}
        {(graphsErrorObj as any)?.response?.data?.detail ||
          (tableErrorObj as any)?.response?.data?.detail ||
          "Unknown error"}
      </div>
    );

  return <DiffusionDisplay graphs={graphsData.graphs} table={tableData} id={id} />;
}
