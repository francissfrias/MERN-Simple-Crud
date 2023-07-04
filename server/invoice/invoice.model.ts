import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Invoice } from './invoice.schema';

const invoiceSchema = new mongoose.Schema<Invoice>({
  userId: { type: String, required: false },
  numberField: { type: String },
  date: { type: Date, default: Date.now() },
  customerName: { type: String, required: true },
  productName: { type: String, required: true },
  productQuantity: { type: Number, required: true, min: 1 },
  productPrice: { type: Number, required: true, min: 0 },
});

invoiceSchema.pre('validate', function (next) {
  if (!this.numberField) {
    this.numberField = uuidv4();
  }

  next();
});

invoiceSchema.virtual('totalInvoiceAmount').get(function () {
  return this.productQuantity * this.productPrice;
});

invoiceSchema.set('toObject', { virtuals: true });
invoiceSchema.set('toJSON', { virtuals: true });

const InvoiceModel = mongoose.model('Invoice', invoiceSchema);

export default InvoiceModel;
