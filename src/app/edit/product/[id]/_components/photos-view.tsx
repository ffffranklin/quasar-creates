import { PhotoInfo } from '@/features/photos/api/get-photos';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { ReactEventHandler } from 'react';

interface PhotosViewProps {
  children?: React.ReactNode;
}

interface PhotosViewImageProps {
  productName: string;
  location: PhotoInfo['location'];
}

interface PhotosViewTileProps {
  onDeleteClick?: ReactEventHandler;
  children: React.ReactNode;
}

export function PhotosView({ children }: PhotosViewProps) {
  return <div className="flex h-[100px] border-2 p-2 mb-4">{children}</div>;
}

PhotosView.Image = function PhotosViewImage({
  productName,
  location,
}: PhotosViewImageProps) {
  return (
    <Image
      width={100}
      height={100}
      src={location || ''}
      alt={`Photo of product with id: ${productName}`}
    />
  );
};

PhotosView.Tile = function PhotosViewTile({
  onDeleteClick,
  children,
}: PhotosViewTileProps) {
  return (
    <div className="group relative size-[100px] mr-4">
      <div className="absolute size-[100px]">{children}</div>

      <div className="absolute size-[100px] invisible group-hover:visible">
        <div className="absolute size-full bg-black opacity-70"></div>
        <Button
          variant="destructive"
          className="absolute z-10 inset-8 cursor-pointer"
          size={'icon'}
          title="Delete photo"
          onClick={onDeleteClick}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};
