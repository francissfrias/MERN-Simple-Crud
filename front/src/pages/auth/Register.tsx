import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, userInitialValues, userSchemaZod } from './user-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Textfield from '../../components/Textfield';
import { useRegister } from '../../hooks/authQuery';

const Login = () => {
  const registerUser = useRegister();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({
    defaultValues: userInitialValues,
    resolver: zodResolver(userSchemaZod),
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = async (data) => {
    await registerUser.mutateAsync(data);
  };

  return (
    <div className='flex  justify-center items-center gap-10	h-screen bg-gray-100'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col bg-white items-center p-10 gap-23'>
          <h1 className='mb-6 fonts'>Register</h1>
          <Textfield
            label='Email'
            type='text'
            errors={errors.email?.message}
            placeholder='Type your email'
            {...register('email')}
          />{' '}
          <Textfield
            label='Password'
            type='text'
            errors={errors.password?.message}
            placeholder='Type your password'
            {...register('password')}
          />
          <button
            type='submit'
            className='p-2 w-32 mb-6 bg-black text-white rounded-md hover:bg-gray-500 hover:text-white'
          >
            Register
          </button>
          <p className='my-5 block mr-auto'>
            Have an account? Click below to log in
          </p>
          <button
            className='block ml-auto p-2 w-32 bg-black text-white rounded-md hover:bg-gray-500 hover:text-white'
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
