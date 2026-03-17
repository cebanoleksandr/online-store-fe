import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  ArrowRightStartOnRectangleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "../redux/hooks";
import { removeProfileAC } from "../redux/profileSlice";
import { setAlertAC } from "../redux/alertSlice";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import { getUserProfile } from "../api/users";
import LogoutPopup from "../components/popups/LogoutPopup";

interface IUser {
  id: number;
  email: string;
  fullName: string | null;
  role: 'USER' | 'ADMIN'; // замініть на ваш UserRole enum, якщо він інший
}

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error: any) {
        dispatch(setAlertAC({ mode: 'error', text: 'Не вдалося завантажити профіль' }));
        // Якщо токен невалідний, зазвичай редиректимо на логін
        if (error.response?.status === 401) navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);

  const onLogout = () => {
    localStorage.removeItem('online-store-token');
    localStorage.removeItem('user-role');
    dispatch(removeProfileAC());
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">

          {/* Хедер профілю */}
          <div className="bg-gray-50 px-8 py-10 border-b border-gray-100 flex flex-col md:flex-row items-center gap-6">
            <div className="h-24 w-24 bg-black rounded-2xl flex items-center justify-center text-white">
              <UserCircleIcon className="h-16 w-16" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {user.fullName || 'Користувач'}
              </h1>
              <p className="text-gray-500 font-medium">{user.email}</p>
              <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheckIcon className="h-4 w-4 mr-1" />
                {user.role}
              </div>
            </div>
            <button
              onClick={() => setIsLogoutPopupOpen(true)}
              className="md:ml-auto flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors font-semibold"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              Вийти
            </button>
          </div>

          {/* Детальна інформація */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Особисті дані</h3>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-50">
                <IdentificationIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Повне ім'я</p>
                  <p className="text-gray-900 font-semibold">{user.fullName || 'Не вказано'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-50">
                <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Електронна пошта</p>
                  <p className="text-gray-900 font-semibold">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Безпека та статус</h3>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-50">
                <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">ID Користувача</p>
                  <p className="text-gray-900 font-semibold">#{user.id.toString().padStart(5, '0')}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-50">
                <ClockIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Тип акаунту</p>
                  <p className="text-gray-900 font-semibold">
                    {user.role === 'ADMIN' ? 'Адміністратор системи' : 'Стандартний клієнт'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Нижня панель дій */}
          <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-4">
            <button className="text-sm font-bold text-gray-600 hover:text-black transition-colors">
              Редагувати профіль
            </button>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Змінити пароль
            </button>
          </div>
        </div>
      </div>

      <LogoutPopup
        isVisible={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
        onLogout={onLogout}
      />
    </MainLayout>
  );
};

export default ProfilePage;