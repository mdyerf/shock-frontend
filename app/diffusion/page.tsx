import { Stack, Typography } from "@mui/material";
import { getIntegrations } from "../mocks/integrations";
import AddDiffusion from "./components/AddDiffusion";
import DiffusionGrid from "./components/DiffusionGrid";

async function Page() {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Diffusions</Typography>
        <AddDiffusion />
      </Stack>
      <DiffusionGrid />
    </>
  );
}

export default Page;
