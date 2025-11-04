import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  API_URL: z.string(),
});

const env: z.infer<typeof envSchema> = createEnv();

function createEnv() {
  const envVars = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  };

  const parsedEnv = envSchema.safeParse(envVars);
  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${formatValidationErrors(parsedEnv.error.flatten().fieldErrors)}
  `
    );
  }

  return parsedEnv.data ?? {};
}

function formatValidationErrors(errors: unknown) {
  return Object.entries(errors as { [key: string]: string })
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n');
}

export { env };
