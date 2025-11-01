'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface EditProductFormProps {
  id: number;
  title: string;
  content: string;
}

interface EditProductFormInnerProps {
  title: string;
  content: string;
  onSubmit: (values: z.infer<typeof editProductFormSchema>) => void;
}

export const editProductFormSchema = z.object({
  title: z.string().min(0).max(70),
  content: z.string().min(0).max(2000),
});

function EditProductFormInner({
  title,
  content,
  onSubmit,
}: EditProductFormInnerProps) {
  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      title,
      content,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Add description here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type={'submit'}>Submit</Button>
      </form>
    </Form>
  );
}

function EditProductForm({ id, title, content }: EditProductFormProps) {
  async function onSubmit(values: z.infer<typeof editProductFormSchema>) {
    await fetch(`/api/products/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        method: 'post',
        data: {
          id,
          title: values.title,
          content: values.content,
        },
      }),
    });
  }

  return (
    <EditProductFormInner title={title} content={content} onSubmit={onSubmit} />
  );
}

export { EditProductForm };
