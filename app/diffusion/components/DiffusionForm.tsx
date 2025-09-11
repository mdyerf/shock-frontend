"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import { Shock } from "@/app/types";
import ShockForm from "./ShockForm";
import ShocksBadges from "./ShocksBadges";
import { useForm } from "react-hook-form";
import SelectInput from "@/app/components/SelectInput";
import api from "@/app/api";
import { getShocksObject } from "../utils/converter";
import { useRouter } from "next/navigation";

type IFormData = {
  name: string;
  integration: string;
  number_of_iterations: number;
  threshold_one: number;
  threshold_two: number;
  threshold_three: number;
};

function DiffusionForm() {
  const router = useRouter();

  const [shocks, setShocks] = useState<Shock[]>([]);
  const [loading, setLoading] = useState(false);

  const processDisabled = useMemo(() => !shocks.length, [shocks]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormData>();

  const handleAddShock = useCallback(
    (shock: Omit<Shock, "id">) =>
      setShocks((ss) => [...ss, { ...shock, id: ss.length }]),
    []
  );

  const handleDeleteShock = useCallback(
    (id: number) => () => setShocks((ss) => ss.filter((s) => s.id !== id)),
    []
  );

  const onSubmit = useCallback(async () => {
    setLoading(true);
    await api.post("/diffusions/", {
      ...getValues(),
      ...getShocksObject(shocks),
    });
    setLoading(false);
    router.push("/diffusion");
  }, [shocks, getValues, router]);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
        gap={1}
      >
        <TextField
          variant="outlined"
          label="Diffusion Name"
          {...register("name", { required: true })}
          error={!!errors.name?.type}
          helperText={errors.name?.type === "required" && "Name is required"}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1">Base Integration:</Typography>
          <SelectInput
            {...register("integration", { required: true })}
            label="Base Integration"
            defaultValue=""
            items={[{ id: 1, name: "2018" }]}
            error={!!errors.integration?.type}
          />
        </Stack>
        <Button
          variant="contained"
          color={processDisabled ? "inherit" : "primary"}
          disabled={processDisabled}
          startIcon={loading ? <CircularProgress size={20} /> : <MemoryIcon />}
          sx={{ textTransform: "none" }}
          onClick={handleSubmit(onSubmit)}
        >
          Start Diffusion
        </Button>
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
              label="Iteration Count"
              {...register("number_of_iterations", { required: true })}
              error={!!errors.number_of_iterations?.type}
              helperText={
                errors.number_of_iterations?.type === "required" &&
                "Iterations Count is required"
              }
            />
            <TextField
              variant="outlined"
              label="Threshold 1"
              {...register("threshold_one", { required: true })}
              error={!!errors.threshold_one?.type}
              helperText={
                errors.threshold_one?.type === "required" &&
                "Threshold 1 is required"
              }
            />
            <TextField
              variant="outlined"
              label="Threshold 2"
              {...register("threshold_two", { required: true })}
              error={!!errors.threshold_two?.type}
              helperText={
                errors.threshold_two?.type === "required" &&
                "Threshold 2 is required"
              }
            />
            <TextField
              variant="outlined"
              label="Threshold 3"
              {...register("threshold_three", { required: true })}
              error={!!errors.threshold_three?.type}
              helperText={
                errors.threshold_three?.type === "required" &&
                "Threshold 1 is required"
              }
            />
          </Stack>
        </Stack>

        <ShockForm
          countries={[
            { id: "US", name: "United States" },
            { id: "CN1", name: "China" },
          ]}
          industries={[{ id: "26", name: "Computer & Electronics" }]}
          onSubmit={(data) => handleAddShock(data as Shock)}
        />

        <ShocksBadges shocks={shocks} onDelete={handleDeleteShock} />
      </Stack>
    </Box>
  );
}

export default DiffusionForm;
