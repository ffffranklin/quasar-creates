import { SiteLayout } from '@/components/site-layout';
import { Product } from '@/components/product';
import { getProducts } from '@/lib/product';

export default async function Home() {
  const products = await getProducts();

  return (
    <SiteLayout>
      <div className="flex justify-between flex-wrap flex-col h-auto lg:h-screen">
        {products.map(({ id, imageUrl, title, price }) => (
          <Product key={id} imageUrl={imageUrl} title={title} price={price} />
        ))}
      </div>
    </SiteLayout>
  );
}
