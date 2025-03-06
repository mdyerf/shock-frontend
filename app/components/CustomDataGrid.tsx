import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "../mocks/gridOrdersData";

export default function CustomizedDataGrid() {
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
