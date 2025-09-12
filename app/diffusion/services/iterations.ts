import api from "@/app/api";

export const getDatasets = () =>
  api.get("/datasets").then((res) => res.data) as Promise<
    { id: string; name: string }[]
  >;

export const getDiffusionGraph = (id: string) =>
  api
    .post(`/diffusions/${id}/iterations/`, {
      filters: { limit_largest_shocks: 1 },
    })
    .then((res) => res.data);

export const getDiffusionTable = (
  id: string,
  sortBy: string = "Row",
  order: "asc" | "desc" = "asc"
) =>
  api
    .get(`/diffusions/${id}/iterations/?sort_by=${sortBy}&sort_order=${order}`)
    .then((res) => res.data);

export const getCountriesIndustries = async (integration: string) =>
  api.get(`/datasets/meta/${integration}`).then((res) => res.data) as Promise<{
    countries: string[];
    industries: string[];
  }>;
