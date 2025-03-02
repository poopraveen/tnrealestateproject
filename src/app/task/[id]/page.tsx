'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Upload } from 'lucide-react';

const TaskForm: React.FC = () => {
  const { t } = useTranslation();
  
  // Formik form setup
  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
      project: '',
      plotNumber: '',
      assignedTo: '',
      priority: 'Medium',
      dueDate: '',
      notes: '',
      status: 'Pending',
      attachment: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t('taskTitleRequired')),
      type: Yup.string().required(t('taskTypeRequired')),
      project: Yup.string().required(t('projectRequired')),
      assignedTo: Yup.string().required(t('assignedToRequired')),
      dueDate: Yup.date().required(t('dueDateRequired')),
    }),
    onSubmit: (values) => {
      console.log('Task Data:', values);
      alert(t('taskCreated'));
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold text-center mb-4">{t('createTask')}</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        {/* Task Title */}
        <div>
          <label className="text-sm font-semibold">{t('taskTitle')}</label>
          <input 
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('enterTaskTitle')}
            className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-xs">{formik.errors.title}</div>
          ) : null}
        </div>

        {/* Task Type */}
        <div>
          <label className="text-sm font-semibold">{t('taskType')}</label>
          <select 
            name="type" 
            value={formik.values.type} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">{t('selectTaskType')}</option>
            <option value="Site Visit">🏡 {t('siteVisit')}</option>
            <option value="Follow-up">📞 {t('followUp')}</option>
            <option value="Documentation">📜 {t('documentation')}</option>
          </select>
          {formik.touched.type && formik.errors.type ? (
            <div className="text-red-500 text-xs">{formik.errors.type}</div>
          ) : null}
        </div>

        {/* Project Name */}
        <div>
          <label className="text-sm font-semibold">{t('project')}</label>
          <select 
            name="project" 
            value={formik.values.project} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">{t('selectProject')}</option>
            <option value="Project A">🏗️ {t('projectA')}</option>
            <option value="Project B">🏠 {t('projectB')}</option>
          </select>
          {formik.touched.project && formik.errors.project ? (
            <div className="text-red-500 text-xs">{formik.errors.project}</div>
          ) : null}
        </div>

        {/* Assigned To */}
        <div>
          <label className="text-sm font-semibold">{t('assignedTo')}</label>
          <input 
            type="text"
            name="assignedTo"
            value={formik.values.assignedTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('advisorName')}
            className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
          {formik.touched.assignedTo && formik.errors.assignedTo ? (
            <div className="text-red-500 text-xs">{formik.errors.assignedTo}</div>
          ) : null}
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm font-semibold">{t('priority')}</label>
          <select 
            name="priority" 
            value={formik.values.priority} 
            onChange={formik.handleChange} 
            className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="Low">🟢 {t('low')}</option>
            <option value="Medium">🟡 {t('medium')}</option>
            <option value="High">🔴 {t('high')}</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="text-sm font-semibold">{t('dueDate')}</label>
          <input 
            type="date"
            name="dueDate"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
          {formik.touched.dueDate && formik.errors.dueDate ? (
            <div className="text-red-500 text-xs">{formik.errors.dueDate}</div>
          ) : null}
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-semibold">{t('notes')}</label>
          <textarea 
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('additionalDetails')}
            className="w-full p-2 mt-1 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="text-sm font-semibold flex items-center gap-2">
            <Upload size={16} /> {t('attachments')} ({t('optional')})
          </label>
          <input 
            type="file" 
            name="attachment"
            onChange={(e) => formik.setFieldValue('attachment', e.target.files?.[0])}
            className="mt-2 w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 ease-in-out"
        >
          {t('createTask')}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
