"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GridFooter, useGridApiContext } from "@mui/x-data-grid";
import { Chip, Stack, TextField } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import InputModal from "./Modal";

interface IFormInput {
  name: string;
}

function Footer(onGroup?: Function) {
  return () => {
    const [openModal, setOpenModal] = useState(false);

    const apiRef = useGridApiContext();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>();

    const getRows = () =>
      Array.from(apiRef.current.getSelectedRows().values()).map((r) => r.name);

    const handleCreateGroup: SubmitHandler<IFormInput> = ({ name }) => {
      onGroup?.(name, getRows());
      apiRef.current.setRowSelectionModel([]);
    };

    const handleGroupClick = () => setOpenModal(true);

    return (
      <>
        <InputModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmit(handleCreateGroup)}
          text="Enter Group Name"
        >
          <TextField
            variant="outlined"
            label="Group Name"
            {...register("name", { required: "Enter Group Name" })}
            error={!!errors.name?.type}
            helperText={
              errors.name?.type === "required" && "Group name is required"
            }
          />
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
              label="Group selected countries"
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
