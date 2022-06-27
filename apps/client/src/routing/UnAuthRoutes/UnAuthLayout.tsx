import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../storeHooks';

function UnAuthLayout() {
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('control unauthlayout', user);
    if (user.isLogin) {
      navigate('/chat');
      console.log(`someplace in the private routes with the user ${user.email}`);
    }
  }, [user]);
  return <Outlet />;
}

export default UnAuthLayout;
