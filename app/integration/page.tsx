import { Stack, Typography } from "@mui/material";
import IntegrationGrid from "./components/IntegrationGrid";
import { getIntegrations } from "../mocks/integrations";
import AddIntegration from "./components/AddIntegration";

async function Page() {
  const rows = await getIntegrations();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Datasets</Typography>
        <AddIntegration integrations={rows} />
      </Stack>
      <IntegrationGrid rows={rows} />
    </>
  );
}

export default Page;
