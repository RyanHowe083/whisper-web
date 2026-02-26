export default async function PostPage({
  params,
}: {
  params: Promise<{ creatorId: string; postId: string }>;
}) {
  const { creatorId, postId } = await params;
  return <h1>Post: {postId} by {creatorId}</h1>;
}

