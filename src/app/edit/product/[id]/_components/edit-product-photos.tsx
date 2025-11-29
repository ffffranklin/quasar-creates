'use client';

import styles from './edit-product-photos.module.css';
import { Input } from '@/components/ui/input';
import { ChangeEvent, Fragment } from 'react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { PhotoInfo } from '@/features/photos/actions/get-photos';
import { PhotosView } from './photos-view';
import { Product } from '@/lib/types';
import { useDeletePhoto } from '@/features/photos/hooks/use-delete-photo';
import { useUploadPhotos } from '@/features/photos/hooks/use-upload-photos';

interface EditProductPhotosProps {
  product: Product;
  photos: PhotoInfo[];
}

function EditProductPhotos({ product, photos }: EditProductPhotosProps) {
  const [deletePhoto] = useDeletePhoto();
  const [uploadPhotos] = useUploadPhotos(product);

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) =>
    uploadPhotos(evt.target?.files || null);
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
