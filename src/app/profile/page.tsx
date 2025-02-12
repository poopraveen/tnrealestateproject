'use client'
import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
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
  contactDetails: Yup.object({
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    preferredContact: Yup.string().required('Preferred contact method is required'),
  }),
  propertyPreferences: Yup.object({
    type: Yup.string().required('Property type is required'),
    budgetMin: Yup.number().required('Minimum budget is required'),
    budgetMax: Yup.number().required('Maximum budget is required'),
    location: Yup.string().required('Preferred location is required'),
    desiredFeatures: Yup.string(),
  }),
  financialDetails: Yup.object({
    employmentStatus: Yup.string().required('Employment status is required'),
    income: Yup.number().required('Annual income is required'),
    downPayment: Yup.number().required('Down payment amount is required'),
    creditScore: Yup.number().required('Credit score is required'),
  }),
  propertyHistory: Yup.object({
    currentHousing: Yup.string().required('Current housing status is required'),
    reasonForMoving: Yup.string().required('Reason for moving is required'),
    previousAgent: Yup.string(),
  }),
  additionalInfo: Yup.object({
    referralSource: Yup.string(),
    marketingConsent: Yup.bool(),
  }),
  termsAgreement: Yup.bool().oneOf([true], 'You must agree to the terms'),
});

const RealEstateForm: React.FC = () => {
  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log('Form values:', values);
    actions.setSubmitting(false);
  };

  return (
    <div className="container mx-auto p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            {/* Personal Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4">Personal Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <Field
                    id="firstName"
                    type="text"
                    name="personalDetails.firstName"
                    placeholder="First Name"
                    className="input"
                  />
                  {touched.personalDetails?.firstName && errors.personalDetails?.firstName && (
                    <div className="text-red-500">{errors.personalDetails.firstName}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <Field
                    id="lastName"
                    type="text"
                    name="personalDetails.lastName"
                    placeholder="Last Name"
                    className="input"
                  />
                  {touched.personalDetails?.lastName && errors.personalDetails?.lastName && (
                    <div className="text-red-500">{errors.personalDetails.lastName}</div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Field
                  id="dob"
                  type="date"
                  name="personalDetails.dob"
                  className="input mt-4"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <Field as="select" id="gender" name="personalDetails.gender" className="input mt-4">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4">Contact Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <Field
                    id="phone"
                    type="text"
                    name="contactDetails.phone"
                    placeholder="Phone"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    id="email"
                    type="email"
                    name="contactDetails.email"
                    placeholder="Email"
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Field
                  id="address"
                  type="text"
                  name="contactDetails.address"
                  placeholder="Address"
                  className="input mt-4"
                />
              </div>
              <div>
                <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
                <Field as="select" id="preferredContact" name="contactDetails.preferredContact" className="input mt-4">
                  <option value="">Select Preferred Contact Method</option>
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                  <option value="Text">Text</option>
                </Field>
              </div>
            </div>

            {/* Property Preferences */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4">Property Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Property Type</label>
                  <Field
                    id="type"
                    type="text"
                    name="propertyPreferences.type"
                    placeholder="Property Type"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700">Min Budget</label>
                  <Field
                    id="budgetMin"
                    type="number"
                    name="propertyPreferences.budgetMin"
                    placeholder="Min Budget"
                    className="input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700">Max Budget</label>
                  <Field
                    id="budgetMax"
                    type="number"
                    name="propertyPreferences.budgetMax"
                    placeholder="Max Budget"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Preferred Location</label>
                  <Field
                    id="location"
                    type="text"
                    name="propertyPreferences.location"
                    placeholder="Preferred Location"
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="desiredFeatures" className="block text-sm font-medium text-gray-700">Desired Features</label>
                <Field
                  id="desiredFeatures"
                  type="text"
                  name="propertyPreferences.desiredFeatures"
                  placeholder="Desired Features"
                  className="input mt-4"
                />
              </div>
            </div>

            {/* Financial Information */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-2xl font-semibold mb-4">Financial Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700">Employment Status</label>
                  <Field
                    as="select"
                    id="employmentStatus"
                    name="financialDetails.employmentStatus"
                    className="input"
                  >
                    <option value="">Select Employment Status</option>
                    <option value="Employed">Employed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Unemployed">Unemployed</option>
                  </Field>
                </div>
                <div>
                  <label htmlFor="income" className="block text-sm font-medium text-gray-700">Annual Income</label>
                  <Field
                    id="income"
                    type="number"
                    name="financialDetails.income"
                    placeholder="Annual Income"
                    className="input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">Down Payment</label>
                  <Field
                    id="downPayment"
                    type="number"
                    name="financialDetails.downPayment"
                    placeholder="Down Payment"
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700">Credit Score</label>
                  <Field
                    id="creditScore"
                    type="number"
                    name="financialDetails.creditScore"
                    placeholder="Credit Score"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
