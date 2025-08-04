"use client";

import InputModal from "@/app/components/Modal";
import { TextField } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const FiltersModal: FC<IProps> = ({ open, onClose }) => {
  const {
    register,
    formState: { errors },
  } = useForm({ defaultValues: { value: 100 } });

  return (
    <InputModal open={open} text="Filters" submitText="Ok" onSubmit={onClose}>
      <TextField
        {...register("value", { required: true })}
        type="number"
        label="Smallest Shock Value"
        sx={{ maxWidth: 200 }}
        error={!!errors.value?.type}
      />
    </InputModal>
  );
};

export default FiltersModal;
