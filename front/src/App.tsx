import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
const App = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className='flex flex-col justify-start items-center gap-10	h-screen bg-gray-100'>
      <div className='bg-gray-500 flex justify-between items-center w-full p-8 top-0 text-white'>
        <h1>Hi {user?.email}</h1>
        <button
          className='p-2 w-auto b- bg-white text-black rounded-md hover:bg-gray-800 hover:text-white'
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
