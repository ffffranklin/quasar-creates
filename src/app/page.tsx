import {SiteLayout} from "@/components/site-layout";
import {Product} from "@/components/product";
import prismaClient from "@/lib/prisma-client";

async function getItems() {
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


export default async function Home() {
  const products = await getItems();

  return (
    <SiteLayout>
      <div className="flex justify-between flex-wrap flex-col h-auto lg:h-screen">
        {products.map(({ id, imageUrl, title, price })=> (
          <Product
            key={id}
            imageUrl={imageUrl}
            title={title}
            price={price}
          />
        ))}
      </div>
    </SiteLayout>
  );
}
