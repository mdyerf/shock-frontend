"use client";

import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "@/app/components/DataGrid";
import { DiffusionRow } from "../../types";
import StatusChip from "@/app/components/StatusChip";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/api";

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
    field: "integration",
    headerName: "Integration",
    flex: 1,
  },
];

function DiffusionGrid() {
  const { data: diffusions } = useQuery<DiffusionRow[]>({
    queryKey: ["diffusion"],
    queryFn: () => api.get("/diffusions").then((res) => res.data),
  });

  return <DataGrid rows={diffusions ?? []} columns={columns} />;
}

export default DiffusionGrid;
