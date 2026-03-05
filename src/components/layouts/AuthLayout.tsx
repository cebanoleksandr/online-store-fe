import type { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const AuthLayout: FC<IProps> = ({ children }) => {
  return (
    <main className='h-screen w-full bg-gray-100 flex items-center justify-center'>
      {children}
    </main>
  );
};

export default AuthLayout;