'use client';

import { Input } from '@/components/ui/input';
import { ChangeEventHandler, Fragment, useCallback, useState } from 'react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { uploadPhotos } from '@/features/photos/api/upload-photos';
import { PhotoInfo } from '@/features/photos/api/get-photos';
import { PhotosView } from './photos-view';
import { Product } from '@/lib/types';
import styles from './edit-product-photos.module.css';

interface EditProductPhotosProps {
  product: Product;
  photos: PhotoInfo[];
}
function EditProductPhotos({ product, photos }: EditProductPhotosProps) {
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

  return (
    <Fragment>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="photos">Photos</FieldLabel>

            <PhotosView>
              {photos.map(({ location, objectId }) => (
                <PhotosView.Image
                  key={objectId}
                  productName={product.title}
                  location={location}
                />
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
