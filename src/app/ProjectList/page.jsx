'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import * as Yup from 'yup';
import { useTheme } from '../ThemeContext';

// Project List Component
const ProjectList = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [projects, setProjects] = useState([
    { id: 1, name: 'SM Nager 1', plots: 25 },
    { id: 2, name: 'SM Nager 2', plots: 30 },
    { id: 3, name: 'SM Nager 3', plots: 20 },
    { id: 4, name: 'SM Nager 4', plots: 15 },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleAddProject = (values) => {
    const newProject = {
      id: Date.now(),
      name: values.name,
      location: values.location,
      area: values.area,
      dtpcNumber: values.dtpcNumber,
      localBodyNumber: values.localBodyNumber,
      rercNumber: values.rercNumber,
      plots: Math.floor(Math.random() * 50) + 10,
    };
    setProjects([...projects, newProject]);
    setModalOpen(false);
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required(t('validation.projectNameRequired')),
    location: Yup.string().required(t('validation.locationRequired')),
    area: Yup.number().required(t('validation.areaRequired')),
    dtpcNumber: Yup.string().required(t('validation.dtpcNumberRequired')),
    localBodyNumber: Yup.string().required(t('validation.localBodyNumberRequired')),
    rercAppNo: Yup.string().required(t('validation.rercAppNoRequired')),
    pr: Yup.string().required(t('validation.prRequired')),
    ecDocuments: Yup.string().required(t('validation.ecDocumentsRequired')),
    potta: Yup.string().required(t('validation.pottaRequired')),
  });

  const formik = useFormik({
    initialValues: {
      projectName: '',
      location: '',
      area: '',
      dtpcNumber: '',
      localBodyNumber: '',
      rercAppNo: '',
      pr: '',
      ecDocuments: '',
      potta: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setModalOpen(false);
    },
  });

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 text-black dark:bg-gray-900 dark:text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">{t('Projects')}</h2>
      <h3 className="text-lg font-medium mt-4">{t('Available Projects')}</h3>

      <div className="mt-4 space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="font-semibold">{project.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('Number of Plots')}: {project.plots}
            </p>
            <Link
              href={`/PlotInfo?id=${project.id}`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              {t('View More')}
            </Link>
          </div>
        ))}
      </div>

      {/* Add Project Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="w-full mt-6 p-3 bg-blue-500 text-white rounded-lg font-medium text-center hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
      >
        {t('+ Add New Project')}
      </button>

      {/* Project Details Modal */}
      {/* Project Details Modal */}
      {/* Project Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-96 dark:bg-gray-900">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
                {t('projectDocuments.title')}
              </h2>

              <form onSubmit={formik.handleSubmit}>
                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-96">
                  {/* Project Name Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.projectName')}</label>
                    <input
                      type="text"
                      name="projectName"
                      value={formik.values.projectName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.projectName && formik.errors.projectName ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.projectName && formik.errors.projectName && (
                      <div className="text-red-500">{formik.errors.projectName}</div>
                    )}
                  </div>

                  {/* Location Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.location')}</label>
                    <input
                      type="text"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.location && formik.errors.location ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.location && formik.errors.location && (
                      <div className="text-red-500">{formik.errors.location}</div>
                    )}
                  </div>

                  {/* Area Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.area')}</label>
                    <input
                      type="number"
                      name="area"
                      value={formik.values.area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.area && formik.errors.area ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.area && formik.errors.area && (
                      <div className="text-red-500">{formik.errors.area}</div>
                    )}
                  </div>

                  {/* DTPC Number Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.dtpcNumber')}</label>
                    <input
                      type="text"
                      name="dtpcNumber"
                      value={formik.values.dtpcNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.dtpcNumber && formik.errors.dtpcNumber ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.dtpcNumber && formik.errors.dtpcNumber && (
                      <div className="text-red-500">{formik.errors.dtpcNumber}</div>
                    )}
                  </div>

                  {/* Localbody Number Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.localBodyNumber')}</label>
                    <input
                      type="text"
                      name="localBodyNumber"
                      value={formik.values.localBodyNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.localBodyNumber && formik.errors.localBodyNumber ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.localBodyNumber && formik.errors.localBodyNumber && (
                      <div className="text-red-500">{formik.errors.localBodyNumber}</div>
                    )}
                  </div>

                  {/* Rerc App No Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.rercAppNo')}</label>
                    <input
                      type="text"
                      name="rercAppNo"
                      value={formik.values.rercAppNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.rercAppNo && formik.errors.rercAppNo ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.rercAppNo && formik.errors.rercAppNo && (
                      <div className="text-red-500">{formik.errors.rercAppNo}</div>
                    )}
                  </div>

                  {/* PR Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.pr')}</label>
                    <input
                      type="text"
                      name="pr"
                      value={formik.values.pr}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.pr && formik.errors.pr ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.pr && formik.errors.pr && (
                      <div className="text-red-500">{formik.errors.pr}</div>
                    )}
                  </div>

                  {/* EC Documents Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.ecDocuments')}</label>
                    <input
                      type="text"
                      name="ecDocuments"
                      value={formik.values.ecDocuments}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.ecDocuments && formik.errors.ecDocuments ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.ecDocuments && formik.errors.ecDocuments && (
                      <div className="text-red-500">{formik.errors.ecDocuments}</div>
                    )}
                  </div>

                  {/* Potta Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">{t('projectDocuments.potta')}</label>
                    <input
                      type="text"
                      name="potta"
                      value={formik.values.potta}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`mt-1 p-3 border rounded w-full ${formik.touched.potta && formik.errors.potta ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-800 dark:text-white`}
                    />
                    {formik.touched.potta && formik.errors.potta && (
                      <div className="text-red-500">{formik.errors.potta}</div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    {t('submit')}
                  </button>
                  <button
                    type="button"
                    className="mt-4 ml-2 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                    onClick={() => setModalOpen(false)}
                  >
                    {t('close')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
