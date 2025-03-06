import Link from "next/link";
import { Box, Button } from "@mui/material";
import IntegrationGrid from "./components/IntegrationGrid";
import { getIntegrations } from "../mocks/integrations";

async function Page() {
  const rows = await getIntegrations();
  return (
    <>
      <Box my={1}>
        <Link href="integration/new">
          <Button variant="contained" color="secondary">
            Add Integration
          </Button>
        </Link>
      </Box>
      <IntegrationGrid rows={rows} />
    </>
  );
}

export default Page;
