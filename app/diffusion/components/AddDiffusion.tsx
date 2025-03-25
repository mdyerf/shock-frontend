"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { createIntegration } from "../../mocks/integrations";
import InputModal from "@/app/components/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectInput from "@/app/components/SelectInput";
import { useQuery } from "@tanstack/react-query";
interface IFormData {
  name: string;
  integrationId: number;
}

function AddDiffusion() {
  const navigate = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const { data: integrations } = useQuery({
    queryKey: ['integrations'],
    queryFn: () => [{ id: '2018', name: '2018'}]
  })

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
          items={integrations ?? []}
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
