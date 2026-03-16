import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/layouts/AuthLayout"
import * as Yup from 'yup';
import { Form, Formik, type FormikHelpers } from "formik";
import FormikControl from "../components/form/FormikControl";
import { login } from "../api/auth";
import { useState } from "react";

export interface ILoginValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const initialValues: ILoginValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Невірний формат електронної пошти').required('Обов\'язкове поле'),
    password: Yup.string().min(6, 'Пароль повинен містити принаймні 6 символів').required('Обов\'язкове поле'),
  });

  const onSubmit = async (values: ILoginValues, onSubmitProps: FormikHelpers<ILoginValues>) => {
    setIsLoggingIn(true);
    try {
      const data = await login(values.email, values.password);

      localStorage.setItem('online-store-token', data.access_token);
      localStorage.setItem('user-role', data.user.role);

      onSubmitProps.resetForm();

      const event = new Event('authChange');
      window.dispatchEvent(event);

      navigate('/');
    } catch (error) {
      console.error('Login failed: ', error);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <AuthLayout>
      <Formik 
        className="min-h-screen flex items-center justify-center bg-gray-100 px-4 w-200"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Вхід у систему
          </h2>

          <Form className="space-y-6">
            <FormikControl
              control="input"
              label="Email"
              name="email"
              isError={!!formik.touched.email && Boolean(formik.errors.email)}
              isTouched={!!formik.touched.email}
              placeholder="example@mail.com"
            />

            <FormikControl
              control="input"
              label="Пароль"
              name="password"
              isError={!!formik.touched.password && Boolean(formik.errors.password)}
              isTouched={!!formik.touched.password}
              placeholder="••••••••"
              type="password"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />
                Запам'ятати мене
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Забули пароль?</Link>
            </div>

            <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-0.5" disabled={isLoggingIn}>
              {isLoggingIn ? 'Увійти...' : 'Увійти'}
            </button>
          </Form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Немає акаунта?
            <Link to="/register" className="text-blue-600 font-medium hover:underline ml-1">Зареєструватися</Link>
          </p>
        </div>
        )}
      </Formik>
    </AuthLayout>
  )
}

export default LoginPage
