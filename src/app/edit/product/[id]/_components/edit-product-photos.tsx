'use client';

import { Input } from '@/components/ui/input';
import { ChangeEventHandler, Fragment, useCallback } from 'react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { uploadPhotos } from '@/features/photos/api/upload-photos';
import { PhotoInfo } from '@/features/photos/api/get-photos';
import { PhotosView } from './photos-view';
import { Product } from '@/lib/types';
import styles from './edit-product-photos.module.css';
import { useDeletePhoto } from '@/features/photos/photos';

interface EditProductPhotosProps {
  product: Product;
  photos: PhotoInfo[];
}

function EditProductPhotos({ product, photos }: EditProductPhotosProps) {
  const [deletePhoto] = useDeletePhoto();
  const handleFileChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (evt) => {
      const fileList: FileList | null = evt.target?.files || null;

      if (fileList && fileList.length > 0) {
        await uploadPhotos({
          data: {
            productId: product.id,
            photos: Array.from(fileList),
          },
        });
      }
    },
    [product]
  );

  const handleDeleteClick = (pathname: string | null) => deletePhoto(pathname);

  return (
    <Fragment>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="photos">Photos</FieldLabel>

            <PhotosView>
              {photos.map(({ location, locationPathname, objectId }) => (
                <PhotosView.Tile
                  key={objectId}
                  location={locationPathname}
                  onDeleteClick={handleDeleteClick}
                >
                  <PhotosView.Image
                    productName={product.title}
                    location={location}
                  />
                </PhotosView.Tile>
              ))}
            </PhotosView>

            <div className={styles.fileUploadButtonContainer}>
              <Input
                id="photos"
                name="photos[]"
                type="file"
                multiple={true}
                onChange={handleFileChange}
              />
            </div>
          </Field>
        </FieldGroup>
      </form>
      <hr className="my-4" />
    </Fragment>
  );
}

export { EditProductPhotos };
