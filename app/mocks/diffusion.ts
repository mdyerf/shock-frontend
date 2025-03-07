import { Diffusion, DiffusionRow } from "../types";
import { getIntegration } from "./integrations";

export function getDiffusions() {
  return Promise.resolve([
    {
      id: 1,
      name: "Diffusion 1",
      status: "idle",
      integrationName: "Grouping 5 + 1",
    },
    {
      id: 2,
      name: "Diffusion 2",
      status: "running",
      integrationName: "Grouping 5 + 1",
    },
    {
      id: 3,
      name: "Diffusion 3",
      status: "running",
      integrationName: "Grouping 5 + 1",
    },
  ] satisfies DiffusionRow[]);
}

export async function getDiffusion(id: number) {
  return {
    id: 1,
    name: "Diffusion 1",
    status: "idle",
    integration: await getIntegration(0),
  } satisfies Diffusion;
}
