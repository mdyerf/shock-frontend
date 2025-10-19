"use client";

import { Add } from "@mui/icons-material";
import { Button, TextField, CircularProgress } from "@mui/material";
import InputModal from "../../components/Modal";
import { useState } from "react";
import { createIntegration } from "../../mocks/integrations";
import { useRouter } from "next/navigation";
import SelectInput from "@/app/components/SelectInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getDatasets } from "@/app/diffusion/services/iterations";

interface IFormData {
  name: string;
  parentId: number;
}

function AddIntegration() {
  const navigate = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const { data: integrations } = useQuery({
    queryKey: ["datasets"],
    queryFn: () => getDatasets(),
  });

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
        text="New dataset"
        onSubmit={handleSubmit(handleAdd)}
      >
        <TextField
          variant="outlined"
          label="Name"
          {...register("name", { required: true })}
          error={!!errors.name?.type}
          helperText={errors.name?.type === "required" && "Name is required"}
        />
        {integrations ? (
          <SelectInput
            {...register("parentId", { required: true })}
            label="Parent"
            defaultValue=""
            items={integrations}
            error={!!errors.parentId?.type}
          />
        ) : (
          <CircularProgress />
        )}
      </InputModal>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpenModal}
      >
        Add Dataset
      </Button>
    </>
  );
}

export default AddIntegration;
