import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';
import {
  Invoice,
  InvoiceSchemaZod,
  invoiceInitialValues,
} from './invoice-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateInvoice,
  useInvoiceGetById,
  useUpdateInvoice,
} from '../../hooks/invoiceQuery';
import Textfield from '../../components/Textfield';
import { IInvoice } from '../../api/invoice';

const InvoiceForm = () => {
  const navigate = useNavigate();
  const createInvoice = useCreateInvoice();
  const updateInvoice = useUpdateInvoice();

  const currentInvoice = useInvoiceGetById();

  if (currentInvoice.isLoading) {
    <h1>Loading...</h1>;
  }

  const currentInvoiceData: IInvoice = currentInvoice.data?.invoice!;
  console.log(currentInvoice.data);
  console.log(currentInvoiceData);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Invoice>({
    defaultValues: currentInvoiceData!
      ? currentInvoiceData
      : invoiceInitialValues,
    resolver: zodResolver(InvoiceSchemaZod),
    mode: 'onChange',
  });
  useEffect(() => {
    if (!currentInvoice.data) return;

    Object.keys(currentInvoiceData).forEach((key) => {
      const _key = key as keyof Invoice;
      setValue(_key, currentInvoiceData[_key]);
    });
  }, [currentInvoice.data, currentInvoiceData, setValue]);

  const onError = (err) => {
    console.log(err);
  };

  const onSubmit: SubmitHandler<Invoice> = async (invoiceData) => {
    console.log(invoiceData);

    if (currentInvoiceData) {
      await updateInvoice.mutateAsync(invoiceData);
    } else {
      await createInvoice.mutateAsync(invoiceData);
    }
  };
  return (
    <>
      <div className='flex w-full'>
        <button
          className='block m-auto p-2 w-32 bg-black text-white rounded-md hover:bg-gray-500 hover:text-white'
          onClick={() => navigate('/invoice')}
        >
          Back
        </button>
      </div>
      <div className='flex justify-center items-center gap-10  bg-gray-100'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col bg-white items-center p-10  gap-23'>
            <h2 className='mb-6 '>{`${
              currentInvoiceData ? 'Update' : 'Create'
            } invoice`}</h2>

            <Textfield
              errors={errors.productName?.message}
              placeholder='Your product name'
              label='Product Name'
              type='text'
              {...register('productName')}
            />
            <Textfield
              errors={errors.productName?.message}
              placeholder='Your product price'
              label='Product Price'
              type='text'
              {...register('productPrice', {
                setValueAs: (v) => Number(v),
              })}
            />
            <Textfield
              errors={errors.productName?.message}
              placeholder='Your product Quantity'
              label='Product Quantity'
              type='text'
              {...register('productQuantity', {
                setValueAs: (v) => Number(v),
              })}
            />

            <button
              type='submit'
              className='p-2 w-32 mb-6 bg-black text-white rounded-md hover:bg-gray-500 hover:text-white'
            >
              {`${currentInvoiceData ? 'Update' : 'Create'}`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoiceForm;
