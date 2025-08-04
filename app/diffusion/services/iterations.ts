import api from "@/app/api";

export const getDiffusionIterations = (id: string) =>
  api.post(`/diffusions/${id}/iterations`).then((res) => res.data);
