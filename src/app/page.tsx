import {SiteLayout} from "@/components/site-layout";
import {Item} from "@/components/item";
import prismaClient from "@/lib/prisma-client";

async function getItems() {
  const items = await prismaClient.item.findMany({
    include: {
      photos: true
    }
  })
  return items.map((item)=> ({
    id: item.id,
    imageUrl: item.photos[0].location || '',
    title: item.title,
    price: item.content || ''
  }))
}


export default async function Home() {
  const items = await getItems();

  return (
    <SiteLayout>
      <div className="flex justify-between flex-wrap flex-col h-auto lg:h-screen">
        {items.map(({ id, imageUrl, title, price })=> (
          <Item
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
