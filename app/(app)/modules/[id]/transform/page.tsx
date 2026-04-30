import { TransformLoader } from "@/components/reader/transform-loader";

type TransformPageProps = {
  params: { id: string };
};

export default function TransformPage({ params }: TransformPageProps) {
  return <TransformLoader moduleId={params.id} />;
}
