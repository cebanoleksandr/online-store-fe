import type { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface IProps {
  children: ReactNode;
}

const AdminLayout: FC<IProps> = ({ children }) => {
  return (
    <div className='min-h-screen w-full bg-pink-100'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
