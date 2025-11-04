import { config, S3 } from 'aws-sdk';
import 'dotenv/config';

const s3 = new S3();

async function upload(file) {
  const Bucket: string = process.env.AWS_S3_BUCKET || '';
  const Key: string = process.env.AWS_ACCESS_KEY_ID || '';
  const Body = file.buffer;

  const params: S3.Types.PutObjectRequest = { Bucket, Key, Body };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error uploading file:', err);
    } else {
      console.log('File uploaded successfully. File location:', data.Location);
    }
  });
}

async function s3Client() {
  config.update({ region: process.env.AWS_REGION });

  return { upload };
}

export { s3Client };
