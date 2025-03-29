import Link from "next/link";
import { baseURL } from "@/app/api";
import StatusChip from "@/app/components/StatusChip";
import { IconButton, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

export const getGridColumns = (
  onInfoClick: (id: number) => void,
  onDelete: (id: number) => void
): GridColDef[] => [
  {
    field: "name",
    headerName: "Diffusion Name",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        gap={1}
      >
        <Typography variant="body1">{params.value}</Typography>
        <InfoOutlinedIcon
          fontSize="small"
          onClick={() => onInfoClick(params.id as number)}
        />
      </Stack>
    ),
  },
  {
    field: "status",
    headerName: "Execution",
    flex: 1,
    minWidth: 80,
    renderCell: (params) => <StatusChip status={params.value} />,
  },
  {
    field: "integration",
    headerName: "Integration",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => (
      <Stack direction="row">
        <Link href={`${baseURL}/diffusions/download/${params.id}`}>
          <IconButton>
            <DownloadIcon color="info" />
          </IconButton>
        </Link>
        <IconButton onClick={() => onDelete(params.id as number)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
    ),
  },
];
