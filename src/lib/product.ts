import prismaClient from '@/lib/prisma-client';
import prisma from '@/lib/prisma-client';

export async function getProducts() {
  const products = await prismaClient.product.findMany({
    include: {
      photos: true,
    },
  });

  return products.map((product) => ({
    id: product.id,
    imageUrl: product.photos[0].location || '',
    title: product.title,
    price: product.content || '',
  }));
}

export async function getProductById(id: number) {
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });

  return {
    title: product?.title ?? '',
    content: product?.content ?? '',
    ...product,
  };
}
