import DiffusionDisplay from "../components/DiffusionDisplay";
import { getDiffusionIterations } from "../services/iterations";

interface IPageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: IPageProps) {
  const { id } = await params;

  const { graphs, tables } = getDiffusionIterations(id);

  return <DiffusionDisplay graphs={graphs} tables={tables} />;
}

export default Page;
