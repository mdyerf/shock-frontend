import { getIntegration } from "@/app/mocks/integrations";
import Integration from "../components/Integration";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const integration = await getIntegration(id);

  return <Integration {...integration} />;
}
