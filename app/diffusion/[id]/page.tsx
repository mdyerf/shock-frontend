import IterationsGraph from "../components/IterationsGraph";
import { getDiffusionIterations } from "../services/iterations";

interface IPageProps {
  params: Promise<{ id: string }>;
}

async function Page({ params }: IPageProps) {
  const { id } = await params;

  const log = getDiffusionIterations(id);

  return <IterationsGraph iterations={log} />;
}

export default Page;
