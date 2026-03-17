import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import AuthLayout from "../components/layouts/AuthLayout";
import FormikControl from "../components/form/FormikControl";
import { forgotPassword, resetPassword } from "../api/auth";
import { ArrowLeftIcon, KeyIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../redux/hooks";
import { setAlertAC } from "../redux/alertSlice";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [userEmail, setUserEmail] = useState("");
  const [resetToken, setResetToken] = useState(""); // Зберігаємо токен для другого кроку
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Схеми валідації для кожного кроку
  const emailSchema = Yup.object({
    email: Yup.string().email('Невірний формат').required('Обов\'язкове поле'),
  });

  const passwordSchema = Yup.object({
    password: Yup.string().min(6, 'Мінімум 6 символів').required('Обов\'язкове поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Паролі не співпадають')
      .required('Підтвердіть пароль'),
  });

  // Крок 1: Відправка Email
  const handleEmailSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    try {
      // Виклик вашого сервісу
      const data = await forgotPassword(values.email);
      
      setUserEmail(values.email);
      setResetToken(data.token || "temp-token"); 
      
      setStep(2);
      dispatch(setAlertAC({ mode: 'success', text: 'Email підтверджено. Введіть новий пароль.' }));
    } catch (error: any) {
      dispatch(setAlertAC({ mode: 'error', text: 'Користувача з таким Email не знайдено' }));
    } finally {
      setIsLoading(false);
    }
  };

  // Крок 2: Скидання пароля
  const handlePasswordReset = async (values: any) => {
    setIsLoading(true);
    try {
      await resetPassword(resetToken, values.password);
      
      dispatch(setAlertAC({ mode: 'success', text: 'Пароль успішно змінено!' }));
      navigate('/login');
    } catch (error: any) {
      dispatch(setAlertAC({ mode: 'error', text: 'Не вдалося змінити пароль' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          
          {/* Заголовок змінюється залежно від кроку */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 mb-4">
              {step === 1 ? (
                <EnvelopeIcon className="h-6 w-6 text-blue-600" />
              ) : (
                <KeyIcon className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 ? "Відновлення пароля" : "Новий пароль"}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {step === 1 
                ? "Введіть email для ідентифікації акаунта" 
                : `Створення нового пароля для ${userEmail}`}
            </p>
          </div>

          {step === 1 ? (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailSchema}
              onSubmit={handleEmailSubmit}
            >
              {(formik) => (
                <Form className="space-y-6">
                  <FormikControl
                    control="input"
                    label="Електронна пошта"
                    name="email"
                    placeholder="example@mail.com"
                    isError={!!formik.errors.email}
                    isTouched={!!formik.touched.email}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    {isLoading ? "Перевірка..." : "Продовжити"}
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={passwordSchema}
              onSubmit={handlePasswordReset}
            >
              {(formik) => (
                <Form className="space-y-6">
                  <FormikControl
                    control="input"
                    type="password"
                    label="Новий пароль"
                    name="password"
                    placeholder="••••••••"
                    isError={!!formik.errors.password}
                    isTouched={!!formik.touched.password}
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Підтвердіть пароль"
                    name="confirmPassword"
                    placeholder="••••••••"
                    isError={!!formik.errors.confirmPassword}
                    isTouched={!!formik.touched.confirmPassword}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  >
                    {isLoading ? "Оновлення..." : "Змінити пароль"}
                  </button>
                </Form>
              )}
            </Formik>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="text-sm text-gray-500 hover:text-blue-600 flex items-center justify-center">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Повернутися до входу
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
