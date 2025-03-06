import { IntegrationRow } from "../integration/types";

export function getIntegrations() {
  return Promise.resolve([
    {
      id: 1,
      name: "Grouping 5 + 1",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 2,
      name: "Grouping All Industries",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 3,
      name: "First and Third World Countries",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
  ] satisfies IntegrationRow[]);
}
