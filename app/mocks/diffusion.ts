import { Diffusion, DiffusionRow } from "../types";
import { getIntegration } from "./integrations";

export async function getDiffusion(id: number) {
  return {
    id: 1,
    name: "Diffusion 1",
    status: "running",
    integration: await getIntegration(0),
  } satisfies Diffusion;
}
