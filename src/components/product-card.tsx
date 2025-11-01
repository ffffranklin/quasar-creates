import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface ProductProps {
  imageUrl: string;
  title: string;
  price: string;
  id: number;
}

function ProductCard({ id, imageUrl, title, price }: ProductProps) {
  return (
    <Link href={`/edit/product/${id}`}>
      <Card className="w-full lg:w-90 h-min flex-none mb-4">
        <CardContent className="overflow-hidden">
          <img src={imageUrl} />
        </CardContent>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{price}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export { ProductCard };
