import { Stack, Typography } from "@mui/material";
import { getIntegrations } from "../mocks/integrations";
import AddDiffusion from "./components/AddDiffusion";
import { getDiffusions } from "../mocks/diffusion";
import DiffusionGrid from "./components/DiffusionGrid";

async function Page() {
  const integrations = await getIntegrations();
  const diffusions = await getDiffusions();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Diffusions</Typography>
        <AddDiffusion integrations={integrations} />
      </Stack>
      <DiffusionGrid rows={diffusions} />
    </>
  );
}

export default Page;
