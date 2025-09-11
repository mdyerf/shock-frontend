import api from "@/app/api";

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

export const getCountriesIndustries = async (integration: string) => {
  return new Promise<{ countries: { id: string; name: string }[]; industries: { id: string; name: string }[] }>(
    (resolve) => {
      setTimeout(() => {
        resolve({
          countries: [
            { id: "US", name: "United States" },
            { id: "CN", name: "China" },
            { id: "DE", name: "Germany" },
          ],
          industries: [
            { id: "26", name: "Computer & Electronics" },
            { id: "10", name: "Agriculture" },
            { id: "20", name: "Manufacturing" },
          ],
        });
      }, 500); // simulate latency
    }
  );
};
