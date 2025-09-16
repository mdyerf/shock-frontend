import DiffusionForm from "../components/DiffusionForm";
import { getDatasets } from "../services/iterations";

export default async function Page() {
  const integrations = [{ id: "2018", name: "2018" }];

  return <DiffusionForm integrations={integrations} />;
}
