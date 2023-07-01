import React from 'react';

interface IProps {
  label?: string;
  errors?: string;
  type?: string;
  placeholder?: string;
}

const Textfield = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const { label, errors, type, placeholder, ...rest } = props;

  return (
    <div className='pb-6 ml-0 w-full'>
      <label
        className={`block font-latoBold text-sm pb-2 ${
          errors && 'text-red-400'
        }`}
        htmlFor={label}
        aria-label={label}
      >
        {errors ? errors : label}
      </label>
      <input
        className='border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500'
        ref={ref}
        type={type}
        placeholder={placeholder}
        aria-label={`${label}-input`}
        {...rest}
      />
    </div>
  );
});
export default Textfield;
