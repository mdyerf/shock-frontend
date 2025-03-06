"use client";

import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "./DataGrid";
import { Integration } from "../types";
import { Typography } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Country/Group Name",
    flex: 1,
  },
  {
    field: "countries",
    headerName: "Grouped Countries",
    flex: 1,
    renderCell(params) {
      return (
        <Typography variant="body1">
          {(params.value as string[] | undefined)?.join(", ")}
        </Typography>
      );
    },
  },
];

interface CountriesGridProps {
  rows: Integration["countries"];
}

function CountriesGrid({ rows }: CountriesGridProps) {
  return (
    <DataGrid
      rows={rows.map((row, index) => ({ ...row, id: index }))}
      columns={columns}
      checkboxSelection
    />
  );
}

export default CountriesGrid;
