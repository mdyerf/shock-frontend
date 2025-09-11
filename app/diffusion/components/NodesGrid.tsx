import { IterationRow } from "@/app/types";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { FC, useCallback, useState } from "react";

interface IProps {
  rows: IterationRow[];
}

const columns: GridColDef[] = [
  {
    field: "Iteration",
    headerName: "Iteration",
    flex: 1,
  },
  {
    field: "id",
    headerName: "Row Id",
    flex: 1,
  },
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
  {
    field: "source",
    headerName: "Source",
    flex: 1,
  },
  {
    field: "destination",
    headerName: "Destination",
    flex: 1,
  },
  {
    field: "shockType",
    headerName: "Shock Type",
    flex: 1,
  },
  {
    field: "value",
    headerName: "Shock Value",
    flex: 1,
  },
  {
    field: "comment",
    headerName: "Comment",
    flex: 1,
  },
];

const NodesGrid: FC<IProps> = ({ rows }) => {
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

  return (
    <Box height={450}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        onCellClick={handleCellClick}
      />
    </Box>
  );
};

export default NodesGrid;
