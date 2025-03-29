import { Shock } from "@/app/types";

interface IShockObject {
  sources: string[];
  destinations: string[];
  shock_types: ("in" | "out")[];
  shock_amounts: string[];
}

export const getShocksObject = (shocks: Shock[]): IShockObject => {
  const result: IShockObject = {
    sources: [],
    destinations: [],
    shock_types: [],
    shock_amounts: [],
  };

  shocks.forEach((shock) => {
    result.sources.push(`${shock.supplierCountry}_${shock.supplierIndustry}`);
    result.destinations.push(
      `${shock.demanderCountry}_${shock.demanderIndustry}`
    );
    result.shock_types.push(shock.shockType);
    result.shock_amounts.push(
      `${shock.sign === "positive" ? "" : "-"}${shock.value}${shock.percentage ? "%" : ""}`
    );
  });

  return result;
};
