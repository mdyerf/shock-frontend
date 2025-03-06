"use client";

import { CheckCircle, Error, InputOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: "#fffa 0 0 0 1000px",
  p: 4,
};

interface InputModalProps {
  open: boolean;
  onClose: () => void;
  text: string;
  label: string;
  onSubmit: (value: string) => void;
}

function InputModal({ open, text, label, onClose, onSubmit }: InputModalProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [open]);

  const handleClick = () => {
    if (value?.length) {
      onSubmit(value);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6">{text}</Typography>
        <OutlinedInput
          placeholder={label}
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Stack direction="row" justifyContent="space-between">
          <Button
            startIcon={<CheckCircle />}
            variant="contained"
            color="success"
            onClick={handleClick}
          >
            Submit
          </Button>
          <Button
            startIcon={<Error />}
            variant="contained"
            color="error"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default InputModal;
