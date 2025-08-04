import api from "@/app/api";

export const getDiffusionGraph = (id: string) =>
  api.post(`/diffusions/${id}/iterations`).then((res) => res.data);

export const getDiffusionTable = (
  id: string,
  sortBy?: string,
  order: "asc" | "desc" = "desc"
) =>
  api
    .get(`/diffusions/${id}/iterations?sort_by=${sortBy}&sort_order=${order}`)
    .then((res) => res.data);
