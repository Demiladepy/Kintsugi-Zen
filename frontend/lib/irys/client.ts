import { nanoid } from "nanoid";

type UploadJsonInput = {
  data: unknown;
};

export async function uploadJsonToIrys({ data }: UploadJsonInput) {
  const key = process.env.IRYS_PRIVATE_KEY;

  if (!key) {
    const id = `mock-${nanoid(16)}`;
    return {
      id,
      uri: `https://arweave.net/${id}`,
      size: JSON.stringify(data).length,
      mocked: true,
    };
  }

  // Real Irys integration can be plugged here once credentials are provided.
  const id = `stub-${nanoid(20)}`;
  return {
    id,
    uri: `https://arweave.net/${id}`,
    size: JSON.stringify(data).length,
    mocked: false,
  };
}
