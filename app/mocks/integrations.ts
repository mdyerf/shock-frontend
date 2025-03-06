import { Integration, IntegrationRow } from "../integration/types";

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
    {
      id: 4,
      name: "Grouping 5 + 1",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 5,
      name: "Grouping All Industries",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 6,
      name: "First and Third World Countries",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 7,
      name: "Grouping 5 + 1",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 8,
      name: "Grouping All Industries",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 9,
      name: "First and Third World Countries",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 10,
      name: "Grouping 5 + 1",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 11,
      name: "Grouping All Industries",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 12,
      name: "First and Third World Countries",
      status: "idle",
      parentName: "2019",
      childrenCount: 1,
    },
  ] satisfies IntegrationRow[]);
}

export function getIntegration(id: string) {
  return Promise.resolve({
    id: 1,
    name: "Integration Ali",
    enableUndo: false,
    parent: { id: 2, name: "Parent Ali" },
    status: "idle",
    industriesGrouped: false,
    countries: [
      { name: "Iran" },
      { name: "US" },
      { name: "CHN" },
      { name: "RUS" },
      { name: "EU", countries: ["FRC", "GER", "POL"] },
    ],
    children: [],
  } satisfies Integration);
}
