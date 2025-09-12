"use client";

import { Stack, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function AppHeader() {
  const { logout, authenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); // redirect to login page after logout
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mx={1}
      py={1}
      gap={2}
    >
      {/* Left side: App title */}
      <Typography variant="h4">Shock!</Typography>

      {/* Right side: Logout button (only when logged in) */}
      {authenticated && (
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleLogout}
          sx={{ textTransform: "none" }}
        >
          Logout
        </Button>
      )}
    </Stack>
  );
}

export default AppHeader;
