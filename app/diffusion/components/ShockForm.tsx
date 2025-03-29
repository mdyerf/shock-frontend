import {
  Box,
  Button,
  ButtonGroup,
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
import { Integration, Shock } from "@/app/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

interface ShockFormProps {
  countries: Integration["countries"];
  industries: Integration["industries"];
  onSubmit: SubmitHandler<Omit<Shock, "id">>;
}

type IFormData = Omit<Shock, "shockType" | "id">;

function ShockForm({ countries, industries, onSubmit }: ShockFormProps) {
  const [shockType, setShockType] = useState<Shock["shockType"]>("in");

  const {
    register,
    handleSubmit: submit,
    formState: { errors },
  } = useForm<IFormData>();

  const handleSubmit: SubmitHandler<IFormData> = (data) =>
    onSubmit({ ...data, shockType });

  return (
    <form onSubmit={submit(handleSubmit)}>
      <Stack flex={1} gap={2} sx={{ borderLeft: 1, pl: 2 }}>
        <Typography variant="h6" textAlign="center">
          Define a New Shock
        </Typography>
        <Typography variant="body1">Demander</Typography>
        <Stack direction="row" gap={1}>
          <SelectInput
            {...register("demanderCountry", { required: true })}
            defaultValue=""
            label="Demander Country"
            items={countries}
            error={!!errors.demanderCountry?.type}
          />
          <SelectInput
            {...register("demanderIndustry", { required: true })}
            defaultValue=""
            label="Demander Industry"
            items={industries}
            error={!!errors.demanderIndustry?.type}
          />
        </Stack>
        <Typography variant="body1">Supplier</Typography>
        <Stack direction="row" gap={1}>
          <SelectInput
            {...register("supplierCountry", { required: true })}
            defaultValue=""
            label="Supplier Country"
            items={countries}
            error={!!errors.supplierCountry?.type}
          />
          <SelectInput
            {...register("supplierIndustry", { required: true })}
            defaultValue=""
            label="Supplier Industry"
            items={industries}
            error={!!errors.supplierIndustry?.type}
          />
        </Stack>
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
          <TextField
            {...register("value", { required: true })}
            type="number"
            label="Value"
            sx={{ maxWidth: 200 }}
            error={!!errors.value?.type}
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
        <Stack direction="row" gap={1} alignItems="flex-end">
          <Stack gap={1}>
            <Typography variant="body1">Shock Type</Typography>
            <ButtonGroup sx={{ width: 200 }}>
              <Button
                fullWidth
                variant={shockType === "in" ? "contained" : "outlined"}
                onClick={() => setShockType("in")}
              >
                Input
              </Button>
              <Button
                fullWidth
                variant={shockType === "out" ? "contained" : "outlined"}
                onClick={() => setShockType("out")}
              >
                Output
              </Button>
            </ButtonGroup>
          </Stack>
          <Box sx={{ minWidth: 200 }} display="flex" justifyContent="flex-end">
            <Button
              startIcon={<Add />}
              color="primary"
              variant="contained"
              type="submit"
            >
              Add Shock
            </Button>
          </Box>
        </Stack>
      </Stack>
    </form>
  );
}

export default ShockForm;
