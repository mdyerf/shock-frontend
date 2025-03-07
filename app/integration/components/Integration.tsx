"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import MemoryIcon from "@mui/icons-material/Memory";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Country, Integration as DataType, GroupHandler } from "../../types";
import { useMemo, useState } from "react";
import CountriesGrid from "./CountriesGrid";
import InputModal from "../../components/Modal";

type IntegrationProps = DataType;

const allIndustriesGroupName = "all industries";

function Integration({
  id,
  name,
  parent,
  enableUndo,
  status,
  industriesGrouped,
  countries,
  children,
}: IntegrationProps) {
  const [countryGroups, setGroups] = useState<Country[]>([]);
  const [groupIndustries, setGroupIndustries] = useState(false);

  const groups = useMemo(
    () =>
      countries
        .filter((c) => c.countries?.length)
        .map((c) => c.name)
        .concat(industriesGrouped ? [allIndustriesGroupName] : []),
    [industriesGrouped, countries]
  );

  const processDisabled = useMemo(
    () => !groupIndustries && !countryGroups.length,
    [groupIndustries, countryGroups.length]
  );

  const handleGroupIndustries = () => setGroupIndustries(true);

  const handleUnGroupIndustries = () => setGroupIndustries(false);

  const handleCountryGroup: GroupHandler = (name, countries) =>
    setGroups((gs) => [...gs, { name, countries }]);

  const handleRemoveGroup = (name: string) => () =>
    setGroups((gs) => gs.filter((g) => g.name !== name));

  return (
    <>
      <InputModal
        open={status === "running"}
        text="This Integration is Running"
      >
        <Typography variant="h5">Please Wait...</Typography>
        <LinearProgress />
      </InputModal>
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
              color={processDisabled ? "inherit" : "primary"}
              disabled={processDisabled}
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

        <Stack
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap-reverse"
          gap={1}
        >
          <Stack width={200}>
            <Typography variant="body1">Groups</Typography>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              gap={1}
              m={1}
            >
              {groups.map((g) => (
                <Chip key={g} label={g} color="default" />
              ))}
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              gap={1}
              m={1}
            >
              {countryGroups.map(({ name }) => (
                <Chip
                  key={name}
                  label={name}
                  color="secondary"
                  onDelete={handleRemoveGroup(name)}
                />
              ))}
              {groupIndustries && (
                <Chip
                  label={allIndustriesGroupName}
                  color="secondary"
                  onDelete={handleUnGroupIndustries}
                />
              )}
            </Box>
            {!industriesGrouped && !groupIndustries && (
              <Box m={1}>
                <Chip
                  label="Group All Industries"
                  icon={<ControlPointIcon />}
                  color="primary"
                  size="medium"
                  onClick={handleGroupIndustries}
                />
              </Box>
            )}
          </Stack>
          <Box flex={1}>
            <CountriesGrid rows={countries} onGroup={handleCountryGroup} />
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default Integration;
