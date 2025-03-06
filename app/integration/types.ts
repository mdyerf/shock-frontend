export type IntegrationStatus = "running" | "idle";

export type IntegrationRow = {
  id: number;
  name: string;
  status: IntegrationStatus;
  parentName: string;
  childrenCount: number;
};

export type Country = { name: string; countries?: string[] };

export type Integration = {
  id: number;
  name: string;
  enableUndo: boolean;
  status: IntegrationStatus;
  parent: { id: number; name: string };
  industriesGrouped: boolean;
  countries: Country[];
  children: { id: number; name: string }[];
};

export type GroupHandler = (name: string, rows: string[]) => void;
