"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MemoryIcon from "@mui/icons-material/Memory";
import { Diffusion as DataType, Shock } from "@/app/types";
import InputModal from "@/app/components/Modal";
import ShockForm from "./ShockForm";
import { ArrowBack, ArrowForward, Cancel, Close } from "@mui/icons-material";

type DiffusionProps = DataType;

function Diffusion({ name, status, integration }: DiffusionProps) {
  const [shocks, setShocks] = useState<Shock[]>([]);

  const processDisabled = useMemo(() => false, []);

  const handleAddShock = (shock: Omit<Shock, "id">) =>
    setShocks((ss) => [...ss, { ...shock, id: ss.length }]);

  const handleDeleteShock = (id: number) => () =>
    setShocks((ss) => ss.filter((s) => s.id !== id));

  return (
    <>
      <InputModal open={status === "running"} text="This Diffusion is Running">
        <Typography variant="h5">Please Wait...</Typography>
        <LinearProgress />
      </InputModal>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={2}
          gap={1}
        >
          <Typography variant="h4">{name}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1">Base Integration:</Typography>
            <Typography variant="body1" color="secondary">
              {integration.name}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color={processDisabled ? "inherit" : "primary"}
              disabled={processDisabled}
              startIcon={<MemoryIcon />}
            >
              Start Diffusion
            </Button>
            <IconButton>
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap-reverse"
          gap={1}
        >
          <Stack width={200} gap={2}>
            <Typography variant="body1">Parameters:</Typography>
            <Stack gap={2} m={1}>
              <TextField
                variant="outlined"
                name="iterations"
                type="number"
                label="Iteration Count"
              />
              <TextField
                variant="outlined"
                name="threshold1"
                type="number"
                label="Threshold 1"
              />
              <TextField
                variant="outlined"
                name="threshold2"
                type="number"
                label="Threshold 2"
              />
              <TextField
                variant="outlined"
                name="threshold3"
                type="number"
                label="Threshold 3"
              />
            </Stack>
          </Stack>

          <ShockForm
            countries={integration.countries}
            industries={integration.industries}
            onSubmit={handleAddShock}
          />

          <Stack width={300} gap={1}>
            <Typography variant="body1">Shocks:</Typography>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              gap={1}
              m={1}
            >
              {shocks.map(
                ({
                  id,
                  demanderCountry,
                  demanderIndustry,
                  percentage,
                  shockType,
                  sign,
                  supplierCountry,
                  supplierIndustry,
                  value,
                }) => (
                  <Box key={id} border={1} borderRadius={10} px={2} py={1}>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      <Typography variant="body1">
                        {demanderCountry}_{demanderIndustry}
                      </Typography>
                      {shockType === "input" ? (
                        <ArrowForward color="primary" />
                      ) : (
                        <ArrowBack color="secondary" />
                      )}
                      <Typography variant="body1">
                        {supplierCountry}_{supplierIndustry}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={sign === "negative" ? "error" : "success"}
                        fontWeight={800}
                      >
                        {sign === "negative" ? "-" : "+"}
                        {value}
                        {percentage ? "%" : "$"}
                      </Typography>
                      <Cancel
                        sx={{ cursor: "pointer" }}
                        onClick={handleDeleteShock(id)}
                      />
                    </Stack>
                  </Box>
                )
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default Diffusion;
