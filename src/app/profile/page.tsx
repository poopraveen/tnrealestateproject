'use client'
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useDispatch } from "react-redux";
import { pdf } from '@react-pdf/renderer';
import SaleDeed from './SaleDeedComponent';
import { RootState, AppDispatch } from "../../store/store";
import { postProfileData, uploadImage } from '../../store/slices/profileSlice'; // Import the postProfileData action
import * as Yup from 'yup';

// Define the types for the form values
interface FormValues {
  personalDetails: {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
  };
  contactDetails: {
    phone: string;
    email: string;
    address: string;
    preferredContact: string;
  };
  propertyPreferences: {
    type: string;
    budgetMin: number;
    budgetMax: number;
    location: string;
    desiredFeatures: string;
  };
  financialDetails: {
    employmentStatus: string;
    income: number;
    downPayment: number;
    creditScore: number;
  };
  propertyHistory: {
    currentHousing: string;
    reasonForMoving: string;
    previousAgent: string;
  };
  additionalInfo: {
    referralSource: string;
    marketingConsent: boolean;
  };
  termsAgreement: boolean;
}

// Initial form values
const generateRandomValue = () => Math.random().toString(36).substring(7); // Random string
const generateRandomNumber = (min = 1000, max = 9999) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialValues: FormValues = {
  personalDetails: {
    firstName: generateRandomValue(),
    lastName: generateRandomValue(),
    dob: new Date().toISOString().split('T')[0], // Sets today's date
    gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)], // Random gender
  },
  contactDetails: {
    phone: generateRandomNumber(6000000000, 9999999999).toString(), // Random 10-digit number
    email: `${generateRandomValue()}@example.com`, // Random email
    address: `Street ${generateRandomNumber(1, 100)}`, // Random street name
    preferredContact: ['Phone', 'Email', 'Text'][Math.floor(Math.random() * 3)], // Random method
  },
  propertyPreferences: {
    type: ['Apartment', 'House', 'Villa'][Math.floor(Math.random() * 3)], // Random property type
    budgetMin: generateRandomNumber(50000, 100000),
    budgetMax: generateRandomNumber(150000, 500000),
    location: `City ${generateRandomNumber(1, 10)}`, // Random location
    desiredFeatures: ['Pool', 'Garden', 'Garage'][Math.floor(Math.random() * 3)], // Random feature
  },
  financialDetails: {
    employmentStatus: ['Employed', 'Self-Employed', 'Unemployed'][Math.floor(Math.random() * 3)], // Random status
    income: generateRandomNumber(30000, 100000),
    downPayment: generateRandomNumber(10000, 50000),
    creditScore: generateRandomNumber(300, 850), // Credit score range
  },
  propertyHistory: {
    currentHousing: ['Renting', 'Own Home', 'Living with Family'][Math.floor(Math.random() * 3)], // Random
    reasonForMoving: ['Job Relocation', 'Upgrading', 'Downsizing'][Math.floor(Math.random() * 3)],
    previousAgent: generateRandomValue(),
  },
  additionalInfo: {
    referralSource: ['Online Ad', 'Friend', 'Social Media'][Math.floor(Math.random() * 3)], // Random source
    marketingConsent: Math.random() < 0.5, // Random boolean
  },
  termsAgreement: Math.random() < 0.5, // Random boolean
};


// Validation schema with Yup
const validationSchema = Yup.object({
  personalDetails: Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    dob: Yup.date().required('Date of birth is required'),
    gender: Yup.string().required('Gender is required'),
  }),
});

const RealEstateForm: React.FC = () => {
  const [image, setImage] = useState<string | null>(null); // State to hold the uploaded image
  const dispatch = useDispatch<AppDispatch>();

  // Handle the image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Store image as base64
      };
      reader.readAsDataURL(file); // Read the file as base64
    }
  };

  const handleSubmitupload = () => {
    if (image) {
      dispatch(uploadImage(image)); // Dispatch uploadImage action to Redux
    }
  };

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('Form values:', values);
    actions.setSubmitting(false);
    dispatch(postProfileData({ data: values })); // Dispatch postProfileData action
    generatePdfUrl(values);
  };

  const generatePdfUrl = (profileData: any) => {
    // Create the URL for the generated PDF and open it in a new tab
    pdf(<SaleDeed data={profileData} />)
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      })
      .catch((error) => {
        console.error('Failed to generate PDF:', error);
      });
  };

  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6 flex flex-col items-center text-center">
              {/* Personal Details */}
              <div className="mb-6">
                <label
                  htmlFor="fileInput"
                  className="text-xl font-semibold text-gray-900 dark:text-white cursor-pointer"
                >
                  {t('uploadProfilePhoto')}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {image && (
                  <div className="mt-4 flex flex-col items-center">
                    <img
                      src={image}
                      alt="Uploaded Profile"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={handleSubmitupload}
                      className="mt-2 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                    >
                      {t('submit')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t('personalDetails')}</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-gray-900 dark:text-white mb-1">{t('firstName')}</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="personalDetails.firstName"
                    placeholder={t('firstName')}
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                  {touched.personalDetails?.firstName && errors.personalDetails?.firstName && (
                    <div className="text-red-500">{errors.personalDetails.firstName}</div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-gray-900 dark:text-white mb-1">{t('lastName')}</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="personalDetails.lastName"
                    placeholder={t('lastName')}
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                  {touched.personalDetails?.lastName && errors.personalDetails?.lastName && (
                    <div className="text-red-500">{errors.personalDetails.lastName}</div>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="mt-4">
                <label htmlFor="dob" className="block text-gray-900 dark:text-white mb-1">{t('dob')}</label>
                <Field
                  type="date"
                  id="dob"
                  name="personalDetails.dob"
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Gender */}
              <div className="mt-4">
                <label htmlFor="gender" className="block text-gray-900 dark:text-white mb-1">{t('gender')}</label>
                <Field as="select" id="gender" name="personalDetails.gender" className="input dark:bg-gray-700 dark:text-white">
                  <option value="">{t('selectGender')}</option>
                  <option value="Male">{t('male')}</option>
                  <option value="Female">{t('female')}</option>
                  <option value="Other">{t('other')}</option>
                </Field>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t('contactDetails')}</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-gray-900 dark:text-white mb-1">{t('phone')}</label>
                  <Field
                    type="text"
                    id="phone"
                    name="contactDetails.phone"
                    placeholder={t('phone')}
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-900 dark:text-white mb-1">{t('email')}</label>
                  <Field
                    type="email"
                    id="email"
                    name="contactDetails.email"
                    placeholder={t('email')}
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mt-4">
                <label htmlFor="address" className="block text-gray-900 dark:text-white mb-1">{t('address')}</label>
                <Field
                  type="text"
                  id="address"
                  name="contactDetails.address"
                  placeholder={t('address')}
                  className="input dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="mt-4">
                <label htmlFor="preferredContact" className="block text-gray-900 dark:text-white mb-1">{t('preferredContact')}</label>
                <Field as="select" id="preferredContact" name="contactDetails.preferredContact" className="input dark:bg-gray-700 dark:text-white">
                  <option value="">{t('selectPreferredContact')}</option>
                  <option value="Phone">{t('phone')}</option>
                  <option value="Email">{t('email')}</option>
                  <option value="Text">{t('text')}</option>
                </Field>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                {t('submit')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RealEstateForm;
