"use client";

import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "@/app/components/DataGrid";
import { IntegrationRow } from "../../types";
import StatusChip from "@/app/components/StatusChip";
import { useQuery } from "@tanstack/react-query";
import { getDatasets } from "@/app/diffusion/services/iterations";

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
];

function IntegrationGrid() {
  const { data: rows } = useQuery({
    queryKey: ["datasets"],
    queryFn: () => getDatasets(),
  });
  return <DataGrid rows={rows ?? []} columns={columns} />;
}

export default IntegrationGrid;
