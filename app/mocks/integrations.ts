import { Integration, IntegrationRow } from "../types";

export function getIntegrations() {
  return Promise.resolve([
    {
      id: 1,
      name: "Grouping 5 + 1",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 2,
      name: "Grouping All Industries",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 3,
      name: "First and Third World Countries",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 4,
      name: "Grouping 5 + 1",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 5,
      name: "Grouping All Industries",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 6,
      name: "First and Third World Countries",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 7,
      name: "Grouping 5 + 1",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 8,
      name: "Grouping All Industries",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 9,
      name: "First and Third World Countries",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 10,
      name: "Grouping 5 + 1",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 11,
      name: "Grouping All Industries",
      parentName: "2019",
      childrenCount: 1,
    },
    {
      id: 12,
      name: "First and Third World Countries",
      parentName: "2019",
      childrenCount: 1,
    },
  ] satisfies IntegrationRow[]);
}

export function getIntegration(id: number) {
  return Promise.resolve({
    id: 1,
    name: "Integration Ali",
    enableUndo: false,
    parent: { id: 2, name: "Parent Ali" },
    industries: [
      { id: "1", name: "Computer" },
      { id: "2", name: "Electronics" },
      { id: "3", name: "Candy" },
    ],
    countries: [
      { id: "IRI", name: "Iran" },
      { id: "US", name: "United Stated" },
      { id: "CHN", name: "China" },
      { id: "RUS", name: "Russia" },
      { id: "EU", name: "Europe", countries: ["FRC", "GER", "POL"] },
    ],
    children: [],
  } satisfies Integration);
}

export function createIntegration(name: string, parentId: number) {
  return getIntegration(0);
}
