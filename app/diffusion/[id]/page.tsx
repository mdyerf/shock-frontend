import DiffusionDisplay from "../components/DiffusionDisplay";
import { getDiffusionGraph, getDiffusionTable } from "../services/iterations";

interface IPageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: IPageProps) {
  const { id } = await params;

  const { graphs } = await getDiffusionGraph(id);
  const { sorted_log } = await getDiffusionTable(id);

  return <DiffusionDisplay graphs={graphs} tables={sorted_log} />;
}

export default Page;
