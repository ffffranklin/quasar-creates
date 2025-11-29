'use server';

import { s3Client } from '@/lib/s3-client';

async function deletePhoto(key: string) {
  const s3 = s3Client();
  await s3.deleteObject(key);
}

export { deletePhoto };
