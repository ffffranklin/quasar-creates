import prismaClient from '@/lib/prisma-client';
import prisma from '@/lib/prisma-client';

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
