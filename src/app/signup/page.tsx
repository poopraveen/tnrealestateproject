'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/slices/auth';
import { AppDispatch, RootState } from '../../store/store';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('nameRequired')),
      email: Yup.string().email(t('invalidEmail')).required(t('emailRequired')),
      password: Yup.string().min(6, t('passwordMin')).required(t('passwordRequired')),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const resultAction = await dispatch(signupUser(values));

      if (signupUser.fulfilled.match(resultAction)) {
        router.push('/'); // Redirect to home after signup
      } else {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{t('signup')}</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">{t('name')}</label>
            <input
              type="text"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">{t('email')}</label>
            <input
              type="email"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">{t('password')}</label>
            <input
              type="password"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {status === 'loading' || loading ? t('loading') : t('signup')}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          {t('alreadyAccount')} <Link href="/login" className="text-blue-500">{t('login')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
