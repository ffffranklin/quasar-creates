import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string(),
  AWS_S3_BUCKET: z.string(),
  AWS_REGION: z.string(),
});

const env: z.infer<typeof envSchema> = createEnv();

function createEnv() {
  const envVars = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    AWS_S3_BUCKET: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
  };

  const parsedEnv = envSchema.safeParse(envVars);
  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided. \n ${z.prettifyError(parsedEnv.error)}`
    );
  }

  return parsedEnv.data ?? {};
}

export { env };
