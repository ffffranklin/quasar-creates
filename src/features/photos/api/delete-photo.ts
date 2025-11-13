'use server';
import { s3Client } from '@/lib/s3-client';

async function deletePhoto(productId: number, filePath: string) {
  const s3 = s3Client();
  await s3.deleteObject(productId, filePath);
}

export { deletePhoto };
