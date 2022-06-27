import { Outlet, useNavigate } from 'react-router-dom';
import useAuthContext from '../../authentication/useAuthContext';
import { useEffect } from 'react';
import { useAppSelector } from '../../storeHooks';

function AuthLayout() {
  // const { user } = useAuthContext();
  const user = useAppSelector(state => state.user);
  console.log('authlayout', user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isLogin) {
      console.log('no user with valid token redireect to login');
      navigate('/login');
    }
  }, [user]);
  return <Outlet />;
}

export default AuthLayout;
