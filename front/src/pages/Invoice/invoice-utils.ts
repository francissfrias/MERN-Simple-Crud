import * as z from 'zod';

export const InvoiceSchemaZod = z.object({
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
export const PartialInvoiceSchemaZod = InvoiceSchemaZod.partial();

export type Invoice = z.infer<typeof PartialInvoiceSchemaZod>;

export const invoiceInitialValues: Invoice = {
  productName: '',
  productPrice: 1,
  productQuantity: 1,
};
