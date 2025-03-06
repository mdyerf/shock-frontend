export type IntegrationStatus = "running" | "idle";

export type IntegrationRow = {
  id: number;
  name: string;
  status: IntegrationStatus;
  parentName: string;
  childrenCount: number;
};
