"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import MemoryIcon from "@mui/icons-material/Memory";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Integration as DataType } from "../types";
import { useMemo, useState } from "react";
import CountriesGrid from "./CountriesGrid";

type IntegrationProps = DataType;

function Integration({
  id,
  name,
  parent,
  enableUndo,
  industries,
  countries,
  children,
}: IntegrationProps) {
  const [localGroups, setGroups] = useState(["Asia", "Persian", "Arab"]);

  const groups = useMemo(
    // TODO: complete logic
    () => ["all industries", "5 + 1", "Middle East"],
    [industries, countries]
  );

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
        gap={1}
      >
        <Typography variant="h4">{name}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1">Parent:</Typography>
          <Typography variant="body1" color="secondary">
            {parent.name}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            startIcon={<SettingsBackupRestoreIcon />}
          >
            Reset
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MemoryIcon />}
          >
            Start Processing
          </Button>
          <IconButton disabled={!enableUndo}>
            <UndoIcon color={enableUndo ? "secondary" : "disabled"} />
          </IconButton>
          <IconButton>
            <DownloadIcon color="info" />
          </IconButton>
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" flexWrap="wrap-reverse" gap={1}>
        <Stack maxWidth={200}>
          <Typography variant="body1">Groups</Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} m={1}>
            {groups.map((g) => (
              <Chip key={g} label={g} color="default" />
            ))}
          </Box>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} m={1}>
            {localGroups.map((g) => (
              <Chip key={g} label={g} color="secondary" onDelete={() => {}} />
            ))}
          </Box>
          <Box m={1}>
            <Chip
              label="Group All Industries"
              icon={<ControlPointIcon />}
              color="primary"
              size="medium"
              onClick={() => {}}
            />
          </Box>
        </Stack>
        <Box flex={1}>
          <CountriesGrid rows={countries} />
        </Box>
      </Stack>
    </Box>
  );
}

export default Integration;
