import React from 'react';
import { useDeleteInvoice, useInvoiceGetAll } from '../../hooks/invoiceQuery';
import { useNavigate } from 'react-router-dom';

interface TableCellProps {
  className?: string;
  children: React.ReactNode;
}

const TableHeader: React.FC<TableCellProps> = ({ className, children }) => {
  return (
    <th className={`bg-gray-900 text-white py-4 px-6 text-left ${className}`}>
      {children}
    </th>
  );
};

const TableCell: React.FC<TableCellProps> = ({ className, children }) => {
  return <td className={`py-4 px-6 text-left  ${className}`}>{children}</td>;
};

const InvoiceTable = () => {
  const deleteInvoice = useDeleteInvoice();
  const navigate = useNavigate();
  const invoiceQuery = useInvoiceGetAll();

  const data = invoiceQuery.data?.invoice;

  if (invoiceQuery.isLoading) {
    <p>loading...</p>;
  }

  const totalAmount = data?.reduce(
    (acc, curr) => (acc += curr.productPrice * curr.productQuantity),
    0
  );
  const totalQuantity = data?.reduce(
    (acc, curr) => (acc += curr.productQuantity),
    0
  );

  return (
    <>
      <div className='flex w-full'>
        <button
          className='block m-auto p-2 w-32 bg-black text-white rounded-md hover:bg-gray-500 hover:text-white'
          onClick={() => navigate('/newInvoice')}
        >
          Create Invoice
        </button>
      </div>
      <table className='w-3/4 mx-auto text-base border-collapse bc'>
        <thead className='bg-white'>
          <tr>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Sub Total</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody className='align-center '>
          {data?.map((data, i) => {
            return (
              <tr className='bg-black' key={i}>
                <TableCell>{data?.productName}</TableCell>
                <TableCell>{data?.productQuantity}</TableCell>
                <TableCell>{data?.productPrice}</TableCell>
                <TableCell>
                  {Math.abs(data?.productPrice * data?.productQuantity)}
                </TableCell>

                <TableCell className='flex justify-around mr-auto'>
                  <button
                    className='block mr-auto px-3 py-0.5 w-auto bg-black text-white rounded-md hover:bg-gray-500 hover:text-white'
                    onClick={() => navigate(`/newInvoice/${data.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className='block mr-auto px-3 py-0.5 w-auto bg-black text-white rounded-md hover:bg-gray-500 hover:text-white'
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure to delete ${data.productName}?`
                        )
                      ) {
                        deleteInvoice.mutateAsync(data.id!);
                      }
                    }}
                  >
                    Delete
                  </button>
                </TableCell>
              </tr>
            );
          })}

          <tr className='bg-gray-100'>
            <TableCell>Total</TableCell>
            <TableCell>{totalQuantity}</TableCell>
            <TableCell> </TableCell>
            <TableCell>{totalAmount}</TableCell>
            <TableCell> </TableCell>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default InvoiceTable;
