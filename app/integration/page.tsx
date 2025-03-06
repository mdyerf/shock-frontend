"use client";

import Link from "next/link";
import { Box, Button } from "@mui/material";
import CustomizedDataGrid from "@/app/components/CustomDataGrid";

function Page() {
  return (
    <>
      <Box my={1}>
        <Link href="integration/new">
          <Button variant="contained" color="secondary">
            Add Integration
          </Button>
        </Link>
      </Box>
      <CustomizedDataGrid />
    </>
  );
}

export default Page;
