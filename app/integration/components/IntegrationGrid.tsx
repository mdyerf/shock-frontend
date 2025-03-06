"use client";

import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "./DataGrid";
import { Chip } from "@mui/material";
import { IntegrationRow, IntegrationStatus } from "../types";

function renderLink({ id, name }: { id: number; name: string }) {
  return <Link href={`/integration/${id}`}>{name}</Link>;
}

function renderStatus(status: IntegrationStatus) {
  const colors = {
    idle: "success",
    running: "error",
  } satisfies Record<IntegrationStatus, "success" | "error">;

  return <Chip label={status} color={colors[status]} size="small" />;
}

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Integration Name",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) =>
      renderLink({ id: params.id as number, name: params.value }),
  },
  {
    field: "status",
    headerName: "Execution",
    flex: 1,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "parentName",
    headerName: "Parent",
    flex: 1,
  },
  {
    field: "childrenCount",
    headerName: "Children Count",
    flex: 1,
  },
];

interface IntegrationGridProps {
  rows: IntegrationRow[];
}

function IntegrationGrid({ rows }: IntegrationGridProps) {
  return <DataGrid rows={rows} columns={columns} />;
}

export default IntegrationGrid;
