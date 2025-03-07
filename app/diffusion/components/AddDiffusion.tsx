"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";
import { Button, MenuItem, TextField, Select } from "@mui/material";
import { IntegrationRow } from "@/app/types";
import { createIntegration } from "../../mocks/integrations";
import InputModal from "@/app/components/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectInput from "@/app/components/SelectInput";

interface AddDiffusionProps {
  integrations: IntegrationRow[];
}

interface IFormData {
  name: string;
  integrationId: number;
}

function AddDiffusion({ integrations }: AddDiffusionProps) {
  const navigate = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const handleOpenModal = () => setModalOpen(true);

  const handleAdd: SubmitHandler<IFormData> = ({ name, integrationId }) => {
    createIntegration(name, integrationId).then(({ id }) =>
      navigate.push(`/diffusion/${id}`)
    );
  };

  return (
    <>
      <InputModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        text="Enter Diffusion Name"
        onSubmit={handleSubmit(handleAdd)}
      >
        <TextField
          variant="outlined"
          label="Diffusion Name"
          {...register("name", { required: true })}
          error={!!errors.name?.type}
          helperText={errors.name?.type === "required" && "Name is required"}
        />
        <SelectInput
          {...register("integrationId", { required: true })}
          label="Base Integration"
          defaultValue=""
          items={integrations}
          error={!!errors.integrationId?.type}
        />
      </InputModal>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpenModal}
      >
        Add Diffusion
      </Button>
    </>
  );
}

export default AddDiffusion;
