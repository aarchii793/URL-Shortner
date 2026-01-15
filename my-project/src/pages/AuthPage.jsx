

// import React, { useState, useEffect } from 'react';
// import { useRouterState } from '@tanstack/react-router';
// import LoginForm from '../components/loginForm.jsx';
// import RegisterForm from '../components/registerForm.jsx';

// const AuthPage = () => {
//   const pathname = useRouterState({ select: state => state.location.pathname });
//   const [login, setLogin] = useState(true);

//   useEffect(() => {
//     setLogin(pathname === '/auth/login');
//   }, [pathname]);

//   return (
//     <div className="min-h-screen bg-blue-50 flex items-center justify-center">
//       {login ? <LoginForm /> : <RegisterForm />}
//     </div>
//   );
// };

// export default AuthPage;


// pages/AuthPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/auth/login";

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthPage;
