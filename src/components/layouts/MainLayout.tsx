import type { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen w-full bg-blue-100'>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
