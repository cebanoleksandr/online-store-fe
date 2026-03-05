import { useEffect, type FC, type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getUserProfile } from '../../api/users';
import { useAppDispatch } from '../../redux/hooks';
import { setProfileAC } from '../../redux/profileSlice';
import { setAlertAC } from '../../redux/alertSlice';

interface IProps {
  children: ReactNode;
}

const AdminLayout: FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch()

  const getUser = async () => {
    try {
      const profile = await getUserProfile()
      dispatch(setProfileAC(profile))
      localStorage.setItem('user-role', profile.role)
    } catch (error) {
      dispatch(setAlertAC({ text: 'Failed to fetch user profile', mode: 'error' }))
    }
  }

  useEffect(() => {
    if (localStorage.getItem('online-store-token')) {
      getUser()
    }
  }, [localStorage.getItem('online-store-token')])

  return (
    <div className='flex flex-col min-h-screen w-full bg-pink-100'>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
