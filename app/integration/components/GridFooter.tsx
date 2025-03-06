"use client";

import React, { useState } from "react";
import { GridFooter, useGridApiContext } from "@mui/x-data-grid";
import { Chip, OutlinedInput, Stack } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import InputModal from "./Modal";

function Footer(onGroup: Function) {
  return () => {
    const [openModal, setOpenModal] = useState(false);
    const apiRef = useGridApiContext();

    const getRows = () =>
      Array.from(apiRef.current.getSelectedRows().values()).map((r) => r.name);

    const handleCreateGroup = (formData: FormData) => {
      onGroup(formData.get("name"), getRows());
      apiRef.current.setRowSelectionModel([]);
    };

    const handleGroupClick = () => setOpenModal(true);

    return (
      <>
        <InputModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateGroup}
          text="Enter Group Name"
        >
          <OutlinedInput name="name" placeholder="Group Name" />
        </InputModal>
        <Stack
          direction="row-reverse"
          justifyContent="space-between"
          mx={2}
          alignItems="center"
          my={0}
        >
          <GridFooter />
          {getRows().length > 1 && (
            <Chip
              label="Group SelectedCountries"
              color="primary"
              size="medium"
              icon={<ControlPointIcon />}
              onClick={handleGroupClick}
            />
          )}
        </Stack>
      </>
    );
  };
}

export default Footer;
