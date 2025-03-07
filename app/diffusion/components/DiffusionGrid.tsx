"use client";

import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "@/app/components/DataGrid";
import { DiffusionRow } from "../../types";
import StatusChip from "@/app/components/StatusChip";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Diffusion Name",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => (
      <Link href={`/diffusion/${params.id}`}>{params.value}</Link>
    ),
  },
  {
    field: "status",
    headerName: "Execution",
    flex: 1,
    minWidth: 80,
    renderCell: (params) => <StatusChip status={params.value} />,
  },
  {
    field: "integrationName",
    headerName: "Integration",
    flex: 1,
  },
];

interface DiffusionGridProps {
  rows: DiffusionRow[];
}

function DiffusionGrid({ rows }: DiffusionGridProps) {
  return <DataGrid rows={rows} columns={columns} />;
}

export default DiffusionGrid;
