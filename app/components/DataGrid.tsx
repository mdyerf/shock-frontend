"use client";

import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFooter,
  GridToolbarQuickFilter,
  GridValidRowModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { GroupHandler } from "../types";
import Footer from "./GridFooter";

interface DataGridProps {
  rows: GridValidRowModel[];
  columns: GridColDef[];
  checkboxSelection?: boolean;
  onGroup?: GroupHandler;
}

function SearchBar() {
  return (
    <Box p={1}>
      <GridToolbarQuickFilter variant="outlined" />
    </Box>
  );
}

function CustomDataGrid({
  rows,
  columns,
  onGroup,
  checkboxSelection = false,
}: DataGridProps) {
  // 🧠 Store pagination state
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 8,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPaginationModel(model)} // 👈 listen for changes
        pageSizeOptions={[8]}
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
        checkboxSelection={checkboxSelection}
        disableColumnMenu
        disableColumnSorting
        disableColumnSelector
        disableRowSelectionOnClick={!checkboxSelection}
        disableColumnResize
        density="compact"
        slots={{
          toolbar: SearchBar,
          footer: checkboxSelection ? Footer(onGroup) : GridFooter,
        }}
      />
    </div>
  );
}

export default CustomDataGrid;
