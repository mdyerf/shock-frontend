import Link from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import DiffusionGrid from "./components/DiffusionGrid";

async function Page() {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Diffusions</Typography>
        <Link href="/diffusion/new">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ textTransform: "none" }}
          >
            Add Diffusion
          </Button>
        </Link>
      </Stack>
      <DiffusionGrid />
    </>
  );
}

export default Page;
