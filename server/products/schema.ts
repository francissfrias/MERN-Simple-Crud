import { z } from 'zod';
import { validate } from '../middlewares/validate';

export const productsSchemaZod = z.object({
  productName: z
    .string({
      required_error: 'Product name is required',
    })
    .min(1, 'Product name cannot be emptyt'),
  productQuantity: z
    .number()
    .positive()
    .min(1, 'Product Quantity cannot be empty'),
  productPrice: z.number().positive(),
});

export type Products = z.infer<typeof productsSchemaZod>;

export type CreateProductsDto = z.infer<typeof productsSchemaZod>;

export const PartialProductsSchemaZod = productsSchemaZod.partial();

export type UpdateProductsDto = z.infer<typeof PartialProductsSchemaZod>;

// validators

export const validateProductsCreate = validate(productsSchemaZod);

export const validateProductsUpdate = validate(PartialProductsSchemaZod);
