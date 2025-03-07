"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";
import { Button, MenuItem, OutlinedInput, Select } from "@mui/material";
import { IntegrationRow } from "@/app/types";
import { createIntegration } from "../../mocks/integrations";
import InputModal from "@/app/components/Modal";

interface AddDiffusionProps {
  integrations: IntegrationRow[];
}

function AddDiffusion({ integrations }: AddDiffusionProps) {
  const navigate = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);

  const handleAdd = (formData: FormData) => {
    const name = formData.get("name")?.toString();
    const integrationId = parseInt(formData.get("integrationId")?.toString() ?? "");

    if (!name || !integrationId) {
      return;
    }

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
        onSubmit={handleAdd}
      >
        <OutlinedInput name="name" placeholder="Diffusion Name" />
        <Select name="integrationId" defaultValue={0}>
          <MenuItem value={0}>Select Base Integration</MenuItem>
          {integrations.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
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
