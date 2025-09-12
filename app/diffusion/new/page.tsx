import DiffusionForm from "../components/DiffusionForm";
import { getDatasets } from "../services/iterations";

export default async function Page() {
  const integrations = await getDatasets();

  return <DiffusionForm integrations={integrations} />;
}
