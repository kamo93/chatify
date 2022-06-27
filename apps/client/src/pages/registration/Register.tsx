import { motion } from 'framer-motion';
import { RegisterForm } from '../../login/Login';

function Register() {
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
          <h2 className="text-center text-3xl mb-10 font-extrabold">Register 💯</h2>
          <RegisterForm isRegistre />
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

export default Register;
