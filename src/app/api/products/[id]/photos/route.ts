import { NextRequest, NextResponse } from 'next/server';
import { s3Client } from '@/lib/s3-client';
import { UploadPhotosResponse } from '@/lib/types/api';

const s3 = s3Client();

export async function POST(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]/photos'>
) {
  const data = await request.formData();
  const file: File = data.get('file') as File;
  const productId: string = data.get('productId') as string;

  if (!productId) {
    return new NextResponse('Missing required product ID', { status: 400 });
  }

  if (Number.isNaN(parseInt(productId))) {
    return new NextResponse('Product ID not parseable', { status: 400 });
  }

  if (!file) {
    return new NextResponse('Missing document', { status: 400 });
  }

  if (!(file instanceof File)) {
    return new NextResponse('Uploaded document is not a File', {
      status: 400,
    });
  }

  // upload to s3
  const { location, error } = await s3.upload(parseInt(productId), file);

  if (error) {
    if (Error.isError(error)) {
      return new NextResponse(error.message, { status: 400 });
    }

    throw error;
  }

  if (location) {
    return NextResponse.json<UploadPhotosResponse>({
      data: { location },
    });
  }
}

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/products/[id]/photos'>
) {
  try {
    const file = await s3.get('index.html');

    return new NextResponse(file);
  } catch (error) {
    console.error(error);
  }
}
