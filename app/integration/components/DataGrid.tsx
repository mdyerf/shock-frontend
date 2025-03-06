"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

interface DataGridProps {
  rows: GridValidRowModel[];
  columns: GridColDef[];
}

function CustomDataGrid({ rows, columns }: DataGridProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        sx={(theme) => ({
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[700]
              : theme.palette.grey[200],
          "& .MuiDataGrid-cell": {
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[200],
          },
        })}
        disableColumnMenu
        disableColumnSorting
        hideFooter
        disableColumnResize
        density="compact"
      />
    </div>
  );
}

export default CustomDataGrid;
