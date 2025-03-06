"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridFooter,
  GridToolbarQuickFilter,
  GridValidRowModel,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Box, Chip, Stack } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

interface DataGridProps {
  rows: GridValidRowModel[];
  columns: GridColDef[];
  checkboxSelection?: boolean;
}

function SearchBar() {
  return (
    <Box p={1}>
      <GridToolbarQuickFilter variant="outlined" />
    </Box>
  );
}

function Footer() {
  const apiRef = useGridApiContext();

  const handleGroupClick = () => {
    const rows = apiRef.current.getSelectedRows();
    console.log(rows.values());
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      mx={2}
      alignItems="center"
      my={0}
    >
      <Chip
        label="Group SelectedCountries"
        color="primary"
        size="medium"
        icon={<ControlPointIcon />}
        onClick={handleGroupClick}
      />
      <GridFooter />
    </Stack>
  );
}

function CustomDataGrid({
  rows,
  columns,
  checkboxSelection = false,
}: DataGridProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[8]}
        paginationModel={{ pageSize: 8, page: 0 }}
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
          footer: Footer,
        }}
      />
    </div>
  );
}

export default CustomDataGrid;
