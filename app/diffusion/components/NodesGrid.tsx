import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";

interface IProps {
  iterations
}

const NodesGrid: FC<IProps> = () => (
  <DataGrid />
)

export default NodesGrid;
