import { z } from 'zod';
import { validate } from '../middlewares/validate';

export const InvoiceSchemaZod = z.object({
  userId: z.string().optional(),
  customerName: z.string({ required_error: 'Customer name is required' }),
  numberField: z
    .string()
    .refine((val) => val.length > 0, {
      message: 'id must be a non-empty string',
    })
    .optional(),
  date: z.date().optional(),
  totalInvoiceAmount: z.number().positive().optional(),
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

export type Invoice = z.infer<typeof InvoiceSchemaZod>;

export type CreateInvoiceDto = z.infer<typeof InvoiceSchemaZod>;

export const PartialInvoiceSchemaZod = InvoiceSchemaZod.partial();

export type UpdateInvoiceDto = z.infer<typeof PartialInvoiceSchemaZod>;

// validators

export const validateInvoiceCreate = validate(InvoiceSchemaZod);

export const validateInvoiceUpdate = validate(PartialInvoiceSchemaZod);
