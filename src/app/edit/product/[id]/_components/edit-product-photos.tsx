'use client';

import { Input } from '@/components/ui/input';
import {
  ChangeEventHandler,
  Fragment,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { uploadPhotos } from '@/features/photos/api/upload-photos';

function EditProductPhotos({ id }: { id: number }) {
  const [status, setStatus] = useState('idle');
  const inputRef = useRef(null);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (evt) => {
      const fileList: FileList | null = evt.target?.files || null;

      if (fileList && fileList.length > 0) {
        setStatus('files selected');
        const resp = await uploadPhotos({
          data: {
            productId: id,
            photos: Array.from(fileList),
          },
        });
      }
    },
    [id]
  );

  return (
    <Fragment>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="photos">Photos</FieldLabel>
            <Input
              ref={inputRef}
              id="photos"
              name="photos[]"
              type="file"
              multiple={true}
              onChange={handleChange}
            />
            <FieldError errors={[{ message: status }]}></FieldError>
          </Field>
        </FieldGroup>
      </form>
      <hr className="my-4" />
    </Fragment>
  );
}

export { EditProductPhotos };
