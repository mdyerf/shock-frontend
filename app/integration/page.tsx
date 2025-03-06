import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import IntegrationGrid from "./components/IntegrationGrid";
import { getIntegrations } from "../mocks/integrations";
import { Add } from "@mui/icons-material";
import AddIntegration from "./AddIntegration";

async function Page() {
  const rows = await getIntegrations();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Integrations</Typography>
        <AddIntegration integrations={rows} />
      </Stack>
      <IntegrationGrid rows={rows} />
    </>
  );
}

export default Page;
