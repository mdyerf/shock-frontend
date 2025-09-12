"use client";

import { FC, useCallback, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  gridFilteredSortedRowEntriesSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Box, Button, Stack, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IterationRow } from "@/app/types";

interface IProps {
  rows: IterationRow[];
}

const columns: GridColDef[] = [
  { field: "Iteration", headerName: "Iteration", flex: 1 },
  { field: "id", headerName: "Row Id", flex: 1 },
  {
    field: "shockId",
    headerName: "Shock Id",
    flex: 1,
    renderCell: (params) => (
      <Typography
        sx={{
          color: "primary.main",
          textDecoration: "underline",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "parentId",
    headerName: "Parents Ids",
    flex: 1,
    renderCell: (params) => (
      <Typography
        sx={{
          color: "primary.main",
          textDecoration: "underline",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  { field: "source", headerName: "Source", flex: 1 },
  { field: "destination", headerName: "Destination", flex: 1 },
  { field: "shockType", headerName: "Shock Type", flex: 1 },
  { field: "value", headerName: "Shock Value", flex: 1 },
  { field: "comment", headerName: "Comment", flex: 1 },
];

const NodesGrid: FC<IProps> = ({ rows }) => {
  const apiRef = useGridApiRef();

  const [filterModel, setFilterModel] = useState({
    items: [] as any[],
  });

  const handleCellClick: GridEventListener<"cellClick"> = useCallback(
    (params) => {
      if (params.field === "parentId" && params.value != null) {
        setFilterModel({
          items: [
            {
              id: 1,
              field: "shockId",
              operator: "equals",
              value: params.value.toString(),
            },
          ],
        });
      }

      if (params.field === "shockId" && params.value != null) {
        setFilterModel({
          items: [
            {
              id: 2,
              field: "parentId",
              operator: "equals",
              value: params.value.toString(),
            },
          ],
        });
      }
    },
    []
  );

  const handleExport = useCallback(() => {
    const visibleRows = gridFilteredSortedRowEntriesSelector(apiRef);
    const data = visibleRows.map((row) => row.model);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nodes");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "nodes_export.xlsx");
  }, [apiRef]);

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleExport}
        >
          Export to Excel
        </Button>
      </Stack>

      <Box height={450}>
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          onCellClick={handleCellClick}
        />
      </Box>
    </Box>
  );
};

export default NodesGrid;
