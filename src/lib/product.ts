import prismaClient from "@/lib/prisma-client";

export async function getProducts() {
  const products = await prismaClient.product.findMany({
    include: {
      photos: true
    }
  })

  return products.map((product)=> ({
    id: product.id,
    imageUrl: product.photos[0].location || '',
    title: product.title,
    price: product.content || ''
  }))
}
