import { IterationRow } from "@/app/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";

interface IProps {
  rows: IterationRow[];
}

const columns: GridColDef[] = [];

const NodesGrid: FC<IProps> = ({ rows }) => (
  <DataGrid rows={rows} columns={columns} />
)

export default NodesGrid;
