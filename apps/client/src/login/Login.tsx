import { motion } from 'framer-motion';
import { FormEvent } from 'react';
import { Gift, Inbox, Key, Smartphone, User } from 'react-feather';
import { Link } from 'react-router-dom';
import { set } from '../features/userSlice';
import { useAppDispatch } from '../storeHooks';

type RegisterFormProps = {
  isRegistre: boolean;
};

export function RegisterForm({ isRegistre }: RegisterFormProps) {
  const dispatch = useAppDispatch();

  const handleRegisterFormSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    dispatch(set({
        id: '123', email: 'test', username: '',
        isLogin: false
    }));
    // setUser({ id: '123', email: 'test' });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleRegisterFormSubmit}>
        <div className="flex flex-col relative">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="pl-8 placeholder:text-blue-800/40 bg-transparent z-10 h-10 border-b border-blue-800"
            placeholder="put your username here"
          />
          <User className="absolute top-[34px] z-0" size={22} />
        </div>
        <div className="flex flex-col relative mt-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="pl-8 placeholder:text-blue-800/40 bg-transparent z-10 h-10 border-b border-blue-800"
            placeholder="Type your password"
          />
          <Key className="absolute top-[34px] z-0" size={22} />
        </div>

        {isRegistre ? (
          <>
            <div className="flex flex-col relative mt-4">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                id="confirm-password"
                className="pl-8 placeholder:text-blue-800/40 bg-transparent z-10 h-10 border-b border-blue-800"
                placeholder="Type your password"
              />
              <Key className="absolute top-[34px] z-0" size={22} />
            </div>
            <div className="flex flex-col relative mt-4">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="pl-8 placeholder:text-blue-800/40 bg-transparent z-10 h-10 border-b border-blue-800"
                placeholder="chatify@gmail.com"
              />
              <Inbox className="absolute top-[34px] z-0" size={22} />
            </div>
            <div className="flex flex-col relative mt-4">
              <label htmlFor="cellphone">Cellphone</label>
              <input
                id="cellphone"
                className="pl-8 placeholder:text-blue-800/40 bg-transparent z-10 h-10 border-b border-blue-800"
                placeholder="+57 320 3453432"
              />
              <Smartphone className="absolute top-[34px] z-0" size={22} />
            </div>
            <div className="flex flex-col relative mt-4">
              <label htmlFor="birth-date">Birth date</label>
              <input
                id="birthday-date"
                className="pl-8 placeholder:text-blue-800/40 bg-transparent z-10 h-10 border-b border-blue-800"
                placeholder="+57 320 3453432"
              />
              <Gift className="absolute top-[34px] z-0" size={22} />
            </div>
          </>
        ) : null}
        <button className="rounded-2xl bg-blue-300 w-full py-2 mt-14" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

function Login() {
  return (
    <section className="h-full grid grid-cols-3">
      <motion.div
        exit={{ transformPerspective: '1000px', rotateY: '90deg' }}
        initial={{ transformPerspective: '1000px', rotateY: '0deg' }}
        transition={{ duration: 0.8 }}
        className="col-start-1 col-end-2 bg-blue-300 origin-left side-login-panel"
      ></motion.div>
      <motion.div
        exit={{ y: [0, 0, -1000], scale: [1, 0.8, 0.8] }}
        transition={{ duration: 0.8, times: [0, 0.8, 1] }}
        className="flex flex-col items-center justify-between h-full bg-blue-150 col-start-2 col-end-3 py-14 px-10"
      >
        <div className="w-full">
          <h2 className="text-center text-3xl mb-10 font-extrabold">Login 🙌</h2>
          <RegisterForm isRegistre={false} />
        </div>
        <div>
          <Link to="register">Or create a new user</Link>
        </div>
      </motion.div>
      <motion.div
        exit={{ transformPerspective: '1000px', rotateY: '-90deg' }}
        initial={{ transformPerspective: '1000px', rotateY: '0deg' }}
        transition={{ duration: 0.8 }}
        className="col-start-3 col-end-4 bg-blue-300 origin-right"
      ></motion.div>
    </section>
  );
}

export default Login;
