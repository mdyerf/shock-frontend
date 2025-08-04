"use client";

import InputModal from "@/app/components/Modal";
import CountriesGrid from "@/app/integration/components/CountriesGrid";
import { Country, GroupHandler } from "@/app/types";
import { Box, Chip, Stack, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { FC, useState } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const GroupsModal: FC<IProps> = ({ open, onClose }) => {
  const countries = [
    { id: "IRI", name: "Iran" },
    { id: "US", name: "United Stated" },
    { id: "CHN", name: "China" },
    { id: "RUS", name: "Russia" },
    { id: "EU", name: "Europe", countries: ["FRC", "GER", "POL"] },
  ];

  const [countryGroups, setGroups] = useState<Country[]>([]);
  const [groupIndustries, setGroupIndustries] = useState(false);

  const handleCountryGroup: GroupHandler = (id ,name, countries) =>
    setGroups((gs) => [...gs, { id, name, countries }]);

  const handleRemoveGroup = (name: string) => () =>
    setGroups((gs) => gs.filter((g) => g.name !== name));

  return (
    <InputModal open={open} text="Groups" submitText="Ok" onSubmit={onClose}>
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap-reverse"
        gap={1}
      >
        <Stack width={200}>
          <Typography variant="body1">Groups</Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} m={1}>
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
                label="all industries"
                color="secondary"
                onDelete={() => setGroupIndustries(false)}
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
                onClick={() => setGroupIndustries(true)}
              />
            </Box>
          )}
        </Stack>
        <Box flex={1}>
          <CountriesGrid rows={countries} onGroup={handleCountryGroup} />
        </Box>
      </Stack>
    </InputModal>
  );
};

export default GroupsModal;
