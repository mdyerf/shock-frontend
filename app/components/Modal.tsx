"use client";

import { FormEventHandler, ReactNode } from "react";
import { CheckCircle, Error } from "@mui/icons-material";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { SubmitHandler } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: "#fffa 0 0 0 1000px",
  p: 4,
};

interface InputModalProps {
  open: boolean;
  onClose?: () => void;
  text: string;
  submitText?: string;
  closeText?: string;
  onSubmit?: SubmitHandler<any>;
  children: ReactNode;
}

function InputModal({
  open,
  text,
  onClose,
  onSubmit,
  submitText = 'Submit',
  closeText = 'Cancel',
  children,
}: InputModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6">{text}</Typography>
        <form onSubmit={onSubmit}>
          <Box display="flex" flexDirection="column" gap={2} my={1}>
            {children}
          </Box>
          <Stack direction="row" justifyContent="space-between">
            {onSubmit && (
              <Button
                startIcon={<CheckCircle />}
                variant="contained"
                type="submit"
                color="success"
              >
                {submitText}
              </Button>
            )}
            {onClose && (
              <Button
                startIcon={<Error />}
                variant="contained"
                color="error"
                onClick={onClose}
              >
                {closeText}
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}

export default InputModal;
