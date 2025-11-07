import { NextRequest, NextResponse } from 'next/server';
import { s3Client } from '@/lib/s3-client';

export async function POST(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]/photos'>
) {
  const data = await request.formData();
  const file: File = data.get('file') as File;

  if (!file) {
    return new NextResponse('Missing document', { status: 400 });
  }

  if (!(file instanceof File)) {
    return new NextResponse('Uploaded document is not a File', {
      status: 400,
    });
  }

  // TODO upload to s3
  // TODO return file s3 url

  return new NextResponse('ok');
}

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]/photos'>
) {
  try {
    const client = await s3Client();
    const file = await client.get('index.html');

    return new NextResponse(file);
  } catch (error) {
    console.error(error);
  }
}
