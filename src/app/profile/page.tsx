'use client'
import React, { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { pdf } from '@react-pdf/renderer';
import SaleDeed from './SaleDeedComponent';
import { RootState, AppDispatch } from "../../store/store";
import { postProfileData, uploadImage } from '../../store/slices/profileSlice'; 
import * as Yup from 'yup';

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

const initialValues: FormValues = {
  personalDetails: {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
  },
  contactDetails: {
    phone: '',
    email: '',
    address: '',
    preferredContact: '',
  },
  propertyPreferences: {
    type: '',
    budgetMin: 0,
    budgetMax: 0,
    location: '',
    desiredFeatures: '',
  },
  financialDetails: {
    employmentStatus: '',
    income: 0,
    downPayment: 0,
    creditScore: 0,
  },
  propertyHistory: {
    currentHousing: '',
    reasonForMoving: '',
    previousAgent: '',
  },
  additionalInfo: {
    referralSource: '',
    marketingConsent: false,
  },
  termsAgreement: false,
};

const validationSchema = Yup.object({
  personalDetails: Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    dob: Yup.date().required('Date of birth is required'),
    gender: Yup.string().required('Gender is required'),
  }),
  // Add validation for other sections as needed
});

const RealEstateForm: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    actions.setSubmitting(false);

    // Handle image upload if there's an image
    if (image) {
      dispatch(uploadImage(image)); // Upload the image
    }

    // Submit form data to Redux store
    dispatch(postProfileData({ data: values }));

    // Generate PDF with the submitted data
    generatePdfUrl(values);
  };

  const generatePdfUrl = (profileData: any) => {
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

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <div className="mb-6">
              <label
                htmlFor="fileInput"
                className="text-xl font-semibold text-gray-900 dark:text-white cursor-pointer"
              >
                Upload Profile Photo
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Uploaded Profile"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
              )}
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Personal Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Field
                  type="text"
                  name="personalDetails.firstName"
                  placeholder="First Name"
                  className="input dark:bg-gray-700 dark:text-white"
                />
                {touched.personalDetails?.firstName && errors.personalDetails?.firstName && (
                  <div className="text-red-500">{errors.personalDetails.firstName}</div>
                )}
              </div>
              <div>
                <Field
                  type="text"
                  name="personalDetails.lastName"
                  placeholder="Last Name"
                  className="input dark:bg-gray-700 dark:text-white"
                />
                {touched.personalDetails?.lastName && errors.personalDetails?.lastName && (
                  <div className="text-red-500">{errors.personalDetails.lastName}</div>
                )}
              </div>
            </div>

            {/* Additional sections for contact details, property preferences, etc. */}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RealEstateForm;
