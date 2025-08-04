import { IterationRow } from "@/app/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";

interface IProps {
  rows: IterationRow[];
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Row Id",
    flex: 1,
  },
  {
    field: "parentId",
    headerName: "Parents Ids",
    flex: 1,
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
];

const NodesGrid: FC<IProps> = ({ rows }) => (
  <DataGrid rows={rows} columns={columns} />
);

export default NodesGrid;
