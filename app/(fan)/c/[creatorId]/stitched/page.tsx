export default async function CreatorStitchedPage({
  params,
}: {
  params: Promise<{ creatorId: string }>;
}) {
  const { creatorId } = await params;
  return <h1>Stitched Answers: {creatorId}</h1>;
}

