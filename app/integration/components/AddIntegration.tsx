"use client";

import { Add } from "@mui/icons-material";
import { Button, MenuItem, TextField, Select } from "@mui/material";
import InputModal from "../../components/Modal";
import { useState } from "react";
import { createIntegration } from "../../mocks/integrations";
import { useRouter } from "next/navigation";
import { IntegrationRow } from "../../types";
import SelectInput from "@/app/components/SelectInput";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddIntegrationProps {
  integrations: IntegrationRow[];
}

interface IFormData {
  name: string;
  parentId: number;
}

function AddIntegration({ integrations }: AddIntegrationProps) {
  const navigate = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const handleOpenModal = () => setModalOpen(true);

  const handleAdd: SubmitHandler<IFormData> = ({ name, parentId }) => {
    createIntegration(name, parentId).then(({ id }) =>
      navigate.push(`/integration/${id}`)
    );
  };

  return (
    <>
      <InputModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        text="Enter Integration Name"
        onSubmit={handleSubmit(handleAdd)}
      >
        <TextField
          variant="outlined"
          label="Integration Name"
          {...register("name", { required: true })}
          error={!!errors.name?.type}
          helperText={errors.name?.type === "required" && "Name is required"}
        />
        <SelectInput
          {...register("parentId", { required: true })}
          label="Parent Integration"
          defaultValue=""
          items={integrations}
          error={!!errors.parentId?.type}
        />
      </InputModal>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpenModal}
      >
        Add Integration
      </Button>
    </>
  );
}

export default AddIntegration;
