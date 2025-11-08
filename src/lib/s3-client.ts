import { env } from '@/config/env';

import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';

const s3c = new S3Client({ region: env.AWS_REGION });

class S3ClientSingleton {
  async upload(file: File) {
    if (!file) {
      throw new Error(
        'Unable to upload bucket from S3, file contents are undefined'
      );
    }

    const fileArrayBuffer: ArrayBuffer = await file.arrayBuffer();
    // convert to buffer to satisfy Body type signature
    const fileBuffer: Buffer = Buffer.from(fileArrayBuffer);
    const Bucket: string = env.AWS_S3_BUCKET || '';
    const Key: string = `assets/${file.name}`;
    const Body: Buffer = fileBuffer;

    try {
      const putCommand = new PutObjectCommand({ Bucket, Key, Body });
      const output: PutObjectCommandOutput = await s3c.send(putCommand);

      console.log('File uploaded successfully. File location:', output.ETag);

      return output;
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  }

  async get(key: string) {
    const Bucket: string = env.AWS_S3_BUCKET || '';

    try {
      const getCommand = new GetObjectCommand({ Bucket, Key: key });
      const { Body } = await s3c.send(getCommand);

      return Body?.transformToString();
    } catch (error) {
      console.log('Error getting object:', error);
    }
  }
}

const s3ClientSingleton = new S3ClientSingleton();

function s3Client() {
  return s3ClientSingleton;
}

export { s3Client, S3ClientSingleton };
