import prismaClient from '@/lib/prisma-client';
import prisma from '@/lib/prisma-client';
import { apiClient } from '@/lib/api-client';
import { AxiosError, AxiosResponse } from 'axios';

export async function getProducts(): Promise<
  Array<{
    title: string;
    imageUrl: string;
    content: string;
    id: number;
  }>
> {
  const products = await prismaClient.product.findMany({
    include: {
      photos: true,
    },
  });

  return products.map((product) => ({
    id: product.id,
    imageUrl: product.photos[0].location || '',
    title: product.title,
    content: product.content || '',
  }));
}

export async function getProductById(id: number) {
  let error;
  let product;

  try {
    product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) throw new Error('product not found');
  } catch (e) {
    error = e;
  }

  return {
    product: {
      id: Number(product?.id),
      title: product?.title ?? '',
      content: product?.content ?? '',
    },
    error,
  };
}

async function updateProductById(
  id: number,
  { title, content }: { title: string; content: string },
  baseUrl: string
): Promise<{
  response: AxiosResponse | null;
  error: { message: string; status: number } | null;
}> {
  let response: AxiosResponse | null;
  let error: { message: string; status: number } | null = null;

  try {
    response = await apiClient.post(`${baseUrl}/api/products/${id}`, {
      method: 'update',
      data: { id, title, content },
    });
  } catch (e) {
    const err: AxiosError = e as AxiosError;
    response = err.response || null;
    error = response?.data.error || null;
  }

  return { response, error };
}

export default updateProductById;
