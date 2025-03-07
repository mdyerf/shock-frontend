export type ProcessStatus = "running" | "idle";

export type IntegrationRow = {
  id: number;
  name: string;
  status: ProcessStatus;
  parentName: string;
  childrenCount: number;
};

export type Country = { id: string; name: string; countries?: string[] };

export type Integration = {
  id: number;
  name: string;
  enableUndo: boolean;
  status: ProcessStatus;
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
  integrationName: string;
};

export type Diffusion = {
  id: number;
  name: string;
  status: ProcessStatus;
  integration: Integration;
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
  shockType: 'input' | 'output';
};
