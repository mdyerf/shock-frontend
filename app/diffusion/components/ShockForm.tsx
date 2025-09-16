import {
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Percent } from "@mui/icons-material";
import SelectInput from "@/app/components/SelectInput";
import { Integration } from "@/app/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface ShockFormProps {
  countries: Integration["countries"];
  industries: Integration["industries"];
  onSubmit: SubmitHandler<IFormData>;
}

type IFormData = {
  demanderCountry: string | null;
  demanderIndustry: string | null;
  supplierCountry: string | null;
  supplierIndustry: string | null;
  value: number | null;
  sign: "positive" | "negative";
  percentage: boolean;
  shockType: "in" | "out";
};

function ShockForm({ countries, industries, onSubmit }: ShockFormProps) {
  const {
    control,
    register,
    reset,
    handleSubmit: submit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      demanderCountry: null,
      demanderIndustry: null,
      supplierCountry: null,
      supplierIndustry: null,
      value: null,
      sign: "positive",
      percentage: true,
      shockType: "in",
    },
  });

  const handleSubmit: SubmitHandler<IFormData> = (data) => {
    onSubmit(data);
    reset({
      ...data,
      demanderCountry: null,
      demanderIndustry: null,
      supplierCountry: null,
      supplierIndustry: null,
      value: null,
    });
  };

  return (
    <form onSubmit={submit(handleSubmit)}>
      <Stack flex={1} gap={2} sx={{ borderLeft: 1, pl: 2 }}>
        <Typography variant="h6" textAlign="center">
          Define a New Shock
        </Typography>

        {/* Supplier */}
        <Typography variant="body1">Supplier</Typography>
        <Stack direction="row" gap={1}>
          <Controller
            name="supplierCountry"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectInput
                {...field}
                label="Country"
                items={countries}
                value={field.value ?? ""}
                error={!!errors.supplierCountry}
              />
            )}
          />
          <Controller
            name="supplierIndustry"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectInput
                {...field}
                label="Industry"
                items={industries}
                value={field.value ?? ""}
                error={!!errors.supplierIndustry}
              />
            )}
          />
        </Stack>

        {/* Demander */}
        <Typography variant="body1">Demander</Typography>
        <Stack direction="row" gap={1}>
          <Controller
            name="demanderCountry"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectInput
                {...field}
                label="Country"
                items={countries}
                value={field.value ?? ""}
                error={!!errors.demanderCountry}
              />
            )}
          />
          <Controller
            name="demanderIndustry"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectInput
                {...field}
                label="Industry"
                items={industries}
                value={field.value ?? ""}
                error={!!errors.demanderIndustry}
              />
            )}
          />
        </Stack>

        {/* Shock Value */}
        <Typography variant="body1">Shock Value</Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <FormControl>
            <Select
              {...register("sign")}
              defaultValue="positive"
              sx={{ py: 0 }}
            >
              <MenuItem value="positive">
                <Typography variant="body1" fontWeight={800} color="primary">
                  +
                </Typography>
              </MenuItem>
              <MenuItem value="negative">
                <Typography variant="body1" fontWeight={800} color="secondary">
                  -
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>

          <Controller
            name="value"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Value"
                sx={{ maxWidth: 200 }}
                value={field.value ?? ""}
                error={!!errors.value}
              />
            )}
          />

          <Stack direction="row">
            <Checkbox
              sx={{ p: 0 }}
              {...register("percentage")}
              color="primary"
              defaultChecked
            />
            <Percent color="primary" />
          </Stack>
        </Stack>

        <Stack direction="row" gap={2} alignItems="flex-end">
          <Stack flex={1} gap={1}>
            <Typography variant="body1">Shock Origin</Typography>
            <Controller
              name="shockType"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ minWidth: 200 }}>
                  <Select {...field}>
                    <MenuItem value="out">Demander</MenuItem>
                    <MenuItem value="in">Supplier</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Stack>

          <Button
            startIcon={<Add />}
            color="primary"
            variant="contained"
            type="submit"
            sx={{ alignSelf: "flex-end" }}
          >
            Add Shock
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default ShockForm;
