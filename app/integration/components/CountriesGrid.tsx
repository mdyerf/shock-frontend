"use client";

import { GridColDef } from "@mui/x-data-grid";
import { GroupHandler, Integration } from "../../types";
import { Typography } from "@mui/material";
import DataGrid from "@/app/components/DataGrid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Country/Group Name",
    flex: 1,
  },
];

interface CountriesGridProps {
  rows: string[];
  onGroup: GroupHandler;
}

function CountriesGrid({ rows, onGroup }: CountriesGridProps) {
  return (
    <DataGrid
      rows={rows.map((row, index) => ({ name: row, id: index }))}
      columns={columns}
      checkboxSelection
      onGroup={onGroup}
    />
  );
}

export default CountriesGrid;
