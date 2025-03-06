"use client";

import { Add } from "@mui/icons-material";
import { Button, MenuItem, OutlinedInput, Select } from "@mui/material";
import InputModal from "./components/Modal";
import { useState } from "react";
import { createIntegration } from "../mocks/integrations";
import { useRouter } from "next/navigation";
import { IntegrationRow } from "./types";

interface AddIntegrationProps {
  integrations: IntegrationRow[];
}

function AddIntegration({ integrations }: AddIntegrationProps) {
  const navigate = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);

  const handleAdd = (formData: FormData) => {
    const name = formData.get("name")?.toString();
    const parentId = parseInt(formData.get("parentId")?.toString() ?? "");

    if (!name || !parentId) {
      return;
    }

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
        onSubmit={handleAdd}
      >
        <OutlinedInput name="name" placeholder="Integration Name" />
        <Select name="parentId" defaultValue={0}>
          <MenuItem value={0}>Select Parent</MenuItem>
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
        Add Integration
      </Button>
    </>
  );
}

export default AddIntegration;
