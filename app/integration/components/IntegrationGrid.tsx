"use client";

import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "@/app/components/DataGrid";
import { IntegrationRow } from "../../types";
import StatusChip from "@/app/components/StatusChip";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => (
      <Link href={`/integration/${params.id}`}>{params.value}</Link>
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
