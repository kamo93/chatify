import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
// import './App.css';
import AppRouter from '../routing/AppRouter';

function App() {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div
        className={`grid z-1 h-screen ease-out duration-1000 ${
          showContacts ? 'grid-cols-main-open' : 'grid-cols-main'
        }`}
      >
        <section className="bg-blue-200 z-0 col-span-1">
          <h1>Contacts</h1>
          <nav className=""></nav>
        </section>
        <section className="z-10 bg-blue-800 col-span-12">
          <div className="grid grid-rows-main-rows h-screen">
            <header className="grid grid-cols-2 p-3 border-b border-blue-600 row-span-1 ">
              <div className="grid auto-col-max items-center justify-start grid-flow-col">
                <IoMenu
                  className="mr-2"
                  onClick={() => {
                    setShowContacts(prev => !prev);
                  }}
                />
                <h2 className="">Chatify - Message</h2>
              </div>
              <nav className="grid items-center justify-end">
                <ul className="grid grid-flow-col">
                  <li className="mr-2 font-bold text-white hover:text-white">
                    <NavLink
                      to="login"
                      className={({ isActive }) =>
                        `hover:text-white ${isActive && 'text-gray-100'}`
                      }
                    >
                      Sign In
                    </NavLink>
                  </li>
                  <li className="font-bold text-white">
                    <NavLink
                      to="register"
                      className={({ isActive }) =>
                        `hover:text-white ${isActive && 'text-gray-100'}`
                      }
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </header>
            <main className="grid row-span-2">
              <AppRouter />
            </main>
            <footer></footer>
          </div>
        </section>
      </div>
  );
}

export default App;

