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

  shocks.forEach(({shockType, ...shock}) => {
    const supplier = `${shock.supplierCountry}_${shock.supplierIndustry}`;
    const demander = `${shock.demanderCountry}_${shock.demanderIndustry}`;
    result.sources.push(shockType === 'in' ? supplier : demander);
    result.destinations.push(shockType === 'in' ? demander : supplier);
    result.shock_types.push(shockType);
    result.shock_amounts.push(
      `${shock.sign === "positive" ? "" : "-"}${shock.value}${shock.percentage ? "%" : ""}`
    );
  });

  return result;
};
