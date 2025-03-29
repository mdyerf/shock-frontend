import { Box, Stack, Typography } from "@mui/material";
import { Shock } from "@/app/types";
import { ArrowBack, ArrowForward, Cancel } from "@mui/icons-material";

interface Props {
  shocks: Shock[];
  onDelete: (id: number) => () => void;
}

function ShocksBadges({ shocks, onDelete }: Props) {
  return (
    <Stack width={300} gap={1}>
      <Typography variant="body1">Shocks:</Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} m={1}>
        {shocks.map(
          ({
            id,
            demanderCountry,
            demanderIndustry,
            percentage,
            shockType,
            sign,
            supplierCountry,
            supplierIndustry,
            value,
          }) => (
            <Box key={id} border={1} borderRadius={10} px={2} py={1}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                <Typography variant="body1">
                  {demanderCountry}_{demanderIndustry}
                </Typography>
                {shockType === "in" ? (
                  <ArrowForward color="primary" />
                ) : (
                  <ArrowBack color="secondary" />
                )}
                <Typography variant="body1">
                  {supplierCountry}_{supplierIndustry}
                </Typography>
                <Typography
                  variant="body1"
                  color={sign === "negative" ? "error" : "success"}
                  fontWeight={800}
                >
                  {sign === "negative" ? "-" : "+"}
                  {value}
                  {percentage ? "%" : "$"}
                </Typography>
                <Cancel sx={{ cursor: "pointer" }} onClick={onDelete(id)} />
              </Stack>
            </Box>
          )
        )}
      </Box>
    </Stack>
  );
}

export default ShocksBadges;
