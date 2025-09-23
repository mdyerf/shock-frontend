import api from "@/app/api";
import { Diffusion } from "@/app/types";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ArrowBack, ArrowForward, Cancel } from "@mui/icons-material";
import StatusChip from "@/app/components/StatusChip";

interface IProps {
  id: number;
}

export default function DiffusionInfo({ id }: IProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["diffusion", id],
    queryFn: () =>
      api.get<Diffusion>(`/diffusions/${id}`).then((res) => res.data),
  });

  if (!data || isLoading) {
    return (
      <Stack>
        <Typography variant="h5">Loading Data</Typography>
        <LinearProgress />
      </Stack>
    );
  }

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottom={1}
        py={1}
        mb={2}
      >
        <Typography variant="h5">{data.name}</Typography>
        <StatusChip status={data.status} />
        <Typography variant="body1">Dataset: {data.integration}</Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} py={1} my={1}>
        {data.sources.map((source, i) => (
          <Box key={i} border={1} borderRadius={1} px={2} py={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="caption" color="textSecondary">
                Supplier
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Demander
              </Typography>
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Typography variant="body1">
                {data.shock_types[i] === "in" ? source : data.destinations[i]}
              </Typography>
              {data.shock_types[i] === "in" && (
                <Typography
                  variant="body1"
                  color={
                    data.shock_amounts[i].startsWith("-") ? "error" : "success"
                  }
                  fontWeight={800}
                >
                  {data.shock_amounts[i]}
                </Typography>
              )}
              {data.shock_types[i] === "in" ? (
                <ArrowForward color="primary" />
              ) : (
                <ArrowBack color="secondary" />
              )}
              {data.shock_types[i] === "out" && (
                <Typography
                  variant="body1"
                  color={
                    data.shock_amounts[i].startsWith("-") ? "error" : "success"
                  }
                  fontWeight={800}
                >
                  {data.shock_amounts[i]}
                </Typography>
              )}
              <Typography variant="body1">
                {data.shock_types[i] === "in" ? data.destinations[i] : source}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>

      <Typography>Iterations: {data.number_of_iterations}</Typography>
      <Typography>
        Thresholds: {data.threshold_one}, {data.threshold_two},{" "}
        {data.threshold_three}
      </Typography>

      <Box my={1} p={1} bgcolor="black">
        <code style={{ color: "white" }}>
          logs: {JSON.stringify(data.logs)}
        </code>
      </Box>
    </Box>
  );
}
