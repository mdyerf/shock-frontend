import Integration from "../components/Integration";

interface PageProps {
  params: Promise<{ id: number }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <Integration id={id} />;
}
