import { z } from 'zod';

const editProductFormSchema = z.object({
  title: z.string().min(0).max(70),
  content: z.string().min(0).max(2000),
});

export { editProductFormSchema };
