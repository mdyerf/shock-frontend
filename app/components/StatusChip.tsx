import { Chip } from "@mui/material";
import { ProcessStatus } from "../types";

interface StatusChipProps {
  status: ProcessStatus;
}

function StatusChip({ status }: StatusChipProps) {
  const colors = {
    pending: "warning",
    running: "info",
    failed: 'error',
    finished: "success",
  } satisfies Record<ProcessStatus, "success" | "error" | "warning" | "info">;

  return <Chip label={status} color={colors[status]} size="small" />;
}

export default StatusChip;
