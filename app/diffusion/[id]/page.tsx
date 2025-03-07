import Diffusion from "../components/Diffusion";
import { getDiffusion } from "@/app/mocks/diffusion";

interface PageProps {
  params: Promise<{ id: number }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const diffusion = await getDiffusion(id);

  return <Diffusion {...diffusion} />;
}
