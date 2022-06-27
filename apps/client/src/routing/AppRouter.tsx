import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from '../login/Login';
import ChatPage from '../pages/chat/ChatPage';
import Register from '../pages/registration/Register';
import AuthLayout from './AuthLayout/AuthLayout';
import UnAuthLayout from './UnAuthRoutes/UnAuthLayout';

function AppRouter() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<UnAuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthLayout />} path="/">
          <Route path="chat" element={<ChatPage />} />
          <Route path="test" element={<ChatPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AppRouter;
