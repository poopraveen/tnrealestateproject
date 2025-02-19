'use client'
import React, { useState } from 'react';
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

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            {/* Personal Details */}
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
                  <button
                    type="button"
                    onClick={handleSubmitupload}
                    className="mt-2 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    Upload
                  </button>
                </div>
              )}
            </div>

            {/* Personal Details */}
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

            <Field
              type="date"
              name="personalDetails.dob"
              className="input dark:bg-gray-700 dark:text-white mt-4"
            />
            <Field as="select" name="personalDetails.gender" className="input dark:bg-gray-700 dark:text-white mt-4">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>

             {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Field
                    type="text"
                    name="contactDetails.phone"
                    placeholder="Phone"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Field
                    type="email"
                    name="contactDetails.email"
                    placeholder="Email"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <Field
                type="text"
                name="contactDetails.address"
                placeholder="Address"
                className="input dark:bg-gray-700 dark:text-white mt-4"
              />
              <Field as="select" name="contactDetails.preferredContact" className="input dark:bg-gray-700 dark:text-white mt-4">
                <option value="">Select Preferred Contact Method</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="Text">Text</option>
              </Field>
            </div>

            {/* Property Preferences */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Property Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Field
                    type="text"
                    name="propertyPreferences.type"
                    placeholder="Property Type"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Field
                    type="number"
                    name="propertyPreferences.budgetMin"
                    placeholder="Min Budget"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Field
                    type="number"
                    name="propertyPreferences.budgetMax"
                    placeholder="Max Budget"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="propertyPreferences.location"
                    placeholder="Preferred Location"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <Field
                type="text"
                name="propertyPreferences.desiredFeatures"
                placeholder="Desired Features"
                className="input dark:bg-gray-700 dark:text-white mt-4"
              />
            </div>

            {/* Financial Information */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Financial Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Field
                    as="select"
                    name="financialDetails.employmentStatus"
                    className="input dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Employment Status</option>
                    <option value="Employed">Employed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Unemployed">Unemployed</option>
                  </Field>
                </div>
                <div>
                  <Field
                    type="number"
                    name="financialDetails.income"
                    placeholder="Annual Income"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Field
                    type="number"
                    name="financialDetails.downPayment"
                    placeholder="Down Payment"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Field
                    type="number"
                    name="financialDetails.creditScore"
                    placeholder="Credit Score"
                    className="input dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* <div className="mt-4">
              <h4>Form Values:</h4>
              <pre>{JSON.stringify(values, null, 2)}</pre>

              <h4>Form Errors:</h4>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </div> */}

            {/* Submit Button */}
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
