import api from "@/app/api";
import StatusChip from "@/app/components/StatusChip";
import { IconButton, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

async function downloadDiffusionFile(diffusionId: number) {
  const response = await api.get(`/diffusions/download/${diffusionId}` as string, {
    responseType: "blob",
  });

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `diffusion-${diffusionId}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

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
    headerName: "Dataset",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => (
      <Stack direction="row">
        <IconButton onClick={() => downloadDiffusionFile(params.id as number)}>
          <DownloadIcon color="info" />
        </IconButton>
        <IconButton onClick={() => onDelete(params.id as number)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
    ),
  },
];
