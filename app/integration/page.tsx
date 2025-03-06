import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import IntegrationGrid from "./components/IntegrationGrid";
import { getIntegrations } from "../mocks/integrations";
import { Add } from "@mui/icons-material";

async function Page() {
  const rows = await getIntegrations();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Integrations</Typography>
        {/* TODO: modal for new integration */}
        <Link href="integration/new">
          <Button variant="contained" color="primary" startIcon={<Add />}>
            Add Integration
          </Button>
        </Link>
      </Stack>
      <IntegrationGrid rows={rows} />
    </>
  );
}

export default Page;
