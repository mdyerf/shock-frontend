import DiffusionDisplay from "../components/DiffusionDisplay";
import { getDiffusionGraph, getDiffusionTable } from "../services/iterations";

interface IPageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: IPageProps) {
  const { id } = await params;

  const { graphs } = await getDiffusionGraph(id);
  const res = await getDiffusionTable(id);

  return <DiffusionDisplay graphs={graphs} table={res} />;
}

export default Page;
