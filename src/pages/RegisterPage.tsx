import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/layouts/AuthLayout"
import * as Yup from 'yup';
import { Form, Formik, type FormikHelpers } from "formik";
import FormikControl from "../components/form/FormikControl";
import { register } from "../api/auth";
import { useState } from "react";

export interface IRegistrationValues {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const initialValues: IRegistrationValues = {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Невірний формат електронної пошти').required('Обов\'язкове поле'),
    password: Yup.string().min(6, 'Пароль повинен містити принаймні 6 символів').required('Обов\'язкове поле'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Паролі не співпадають').required('Обов\'язкове поле'),
    fullName: Yup.string()
      .trim()
      .required('Обов\'язкове поле')
      .test(
        'is-two-words',
        'Введіть ім\'я та прізвище (мінімум два слова)',
        (value) => {
          if (!value) return false;
          const words = value.trim().split(/\s+/);
          return words.length >= 2;
        }
      ),
  });

  const onSubmit = async (values: IRegistrationValues, onSubmitProps: FormikHelpers<IRegistrationValues>) => {
    setIsCreating(true);
    try {
      const data = await register(values.email, values.password, values.fullName);
      localStorage.setItem('online-store-token', data.access_token);
      // todo: get user
      onSubmitProps.resetForm();
      navigate('/');
    } catch (error) {
      console.error('Registration failed: ', error);
    } finally {
      setIsCreating(false);
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
        {formik => (
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Створити акаунт
            </h2>

            <Form className="space-y-4">
              <FormikControl
                control="input"
                label="Повне ім'я"
                name="fullName"
                isError={!!formik.touched.fullName && Boolean(formik.errors.fullName)}
                isTouched={!!formik.touched.fullName}
                placeholder="Іван Іванов"
              />

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

              <FormikControl
                control="input"
                label="Підтвердіть пароль"
                name="confirmPassword"
                isError={!!formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                isTouched={!!formik.touched.confirmPassword}
                placeholder="••••••••"
                type="password"
              />

              <button className="w-full mt-4 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:-translate-y-0.5" disabled={isCreating}>
                {isCreating ? 'Створення...' : 'Зареєструватися'}
              </button>
            </Form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Вже маєте акаунт?
              <Link to="/login" className="text-green-600 font-medium hover:underline ml-1">Увійти</Link>
            </p>
          </div>
        )}
      </Formik>
    </AuthLayout>
  )
}

export default RegisterPage
