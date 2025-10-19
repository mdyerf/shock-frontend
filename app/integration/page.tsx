import { Stack, Typography } from "@mui/material";
import IntegrationGrid from "./components/IntegrationGrid";
import AddIntegration from "./components/AddIntegration";

async function Page() {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Datasets</Typography>
        <AddIntegration />
      </Stack>
      <IntegrationGrid />
    </>
  );
}

export default Page;
