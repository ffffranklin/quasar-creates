import prismaClient from '@/lib/prisma-client';

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
