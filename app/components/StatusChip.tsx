import { Chip } from "@mui/material";
import { ProcessStatus } from "../types";

interface StatusChipProps {
  status: ProcessStatus;
}

function StatusChip({ status }: StatusChipProps) {
  const colors = {
    idle: "success",
    running: "error",
  } satisfies Record<ProcessStatus, "success" | "error">;

  return <Chip label={status} color={colors[status]} size="small" />;
}

export default StatusChip;
