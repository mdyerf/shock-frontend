export type IntegrationStatus = "running" | "idle";

export type IntegrationRow = {
  id: number;
  name: string;
  status: IntegrationStatus;
  parentName: string;
  childrenCount: number;
};

export type Integration = {
  id: number;
  name: string;
  enableUndo: boolean;
  parent: { id: number; name: string };
  industries: "all" | string[];
  countries: { name: string; countries?: string[] }[];
  children: { id: number; name: string }[];
};
