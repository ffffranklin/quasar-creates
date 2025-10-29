import {SiteLayout} from "@/components/site-layout";
import {Item} from "@/components/item";

export default function Home() {
  const items = [
    {
      id: 1,
      imageUrl: '',
      title: 'hi',
      price:'$700'
    }
  ];
  return (
    <SiteLayout>
      {items.map(({ id, imageUrl, title, price })=> (
        <Item
          key={id}
          imageUrl={imageUrl}
          title={title}
          price={price}
        />
      ))}
    </SiteLayout>
  );
}
