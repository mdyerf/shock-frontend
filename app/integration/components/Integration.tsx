"use client";

import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Country, GroupHandler } from "../../types";
import { useMemo, useState } from "react";
import CountriesGrid from "./CountriesGrid";
import InputModal from "../../components/Modal";
import { useQuery } from "@tanstack/react-query";
import { getCountriesIndustries } from "@/app/diffusion/services/iterations";

const allIndustriesGroupName = "all industries";

function Integration({ id }: { id: number }) {
  const [countryGroups, setGroups] = useState<Country[]>([]);
  const [groupIndustries, setGroupIndustries] = useState(false);

  const { data } = useQuery({
    queryKey: ["dataset", id],
    queryFn: () => getCountriesIndustries(id),
  });

  const { countries, industries } = useMemo(
    () => data ?? { countries: [], industries: [] },
    [data]
  );

  const processDisabled = useMemo(
    () => !groupIndustries && !countryGroups.length,
    [groupIndustries, countryGroups.length]
  );

  const handleGroupIndustries = () => setGroupIndustries(true);

  const handleUnGroupIndustries = () => setGroupIndustries(false);

  const handleCountryGroup: GroupHandler = (id, name, countries) =>
    setGroups((gs) => [...gs, { id, name, countries }]);

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
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color={processDisabled ? "inherit" : "primary"}
              disabled={processDisabled}
              startIcon={<MemoryIcon />}
            >
              Start Processing
            </Button>
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
            {!groupIndustries && (
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
