import mongoose from 'mongoose';
import { Products } from './schema';

const productsSchema = new mongoose.Schema<Products>({
  productName: { type: String, required: true },
  productQuantity: { type: Number, required: true, min: 1 },
  productPrice: { type: Number, required: true, min: 0 },
});

productsSchema.set('toObject', { virtuals: true });
productsSchema.set('toJSON', { virtuals: true });

const ProductsModel = mongoose.model('Products', productsSchema);

export default ProductsModel;
