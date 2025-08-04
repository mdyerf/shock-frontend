export type ProcessStatus = "pending" | "running" | "failed" | "finished";

export type IntegrationRow = {
  id: number;
  name: string;
  parentName: string;
  childrenCount: number;
};

export type Country = { id: string; name: string; countries?: string[] };

export type Integration = {
  id: number;
  name: string;
  enableUndo: boolean;
  parent: { id: number; name: string };
  industries: { id: string; name: string }[];
  countries: Country[];
  children: { id: number; name: string }[];
};

export type GroupHandler = (id: string, name: string, rows: string[]) => void;

export type DiffusionRow = {
  id: number;
  name: string;
  status: ProcessStatus;
  integration: string;
};

export type Diffusion = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  status: ProcessStatus;
  number_of_iterations: number;
  integration: string;
  sources: string[];
  destinations: string[];
  shock_types: Shock['shockType'][];
  shock_amounts: string[];
  threshold_one: number;
  threshold_two: number;
  threshold_three: number;
  logs: object;
};

export type Shock = {
  id: number;
  demanderCountry: string;
  demanderIndustry: string;
  supplierCountry: string;
  supplierIndustry: string;
  value: number;
  sign: "positive" | "negative";
  percentage: boolean;
  shockType: "in" | "out";
};

export type IterationRow = {
  source: string;
}
