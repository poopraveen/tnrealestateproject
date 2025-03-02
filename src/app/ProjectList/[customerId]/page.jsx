'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../../store/slices/projectSlice';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { FaMapMarkedAlt, FaBuilding, FaRegFileAlt, FaCheckCircle, FaDownload } from 'react-icons/fa'; // Importing icons

const Projects = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { customerId } = useParams();  // Get project ID from URL params

  // Local state for handling collapsible behavior
  const [openProjectId, setOpenProjectId] = useState(null);

  // Use Redux selectors to get the projects data, status, and error
  const { data: projects, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    // Dispatch the fetchProjects action to load projects when the component mounts
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  // Toggle the collapsible state of a project
  const toggleProject = (projectId) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      {/* Outer Card for Project List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center text-black dark:text-white">
          {t('Projects')}
        </h2>

        {/* Loading State */}
        {status === 'loading' && (
          <p className="text-center text-gray-500 dark:text-gray-300">{t('Loading...')}</p>
        )}

        {/* Error State */}
        {status === 'failed' && (
          <p className="text-red-500 text-center dark:text-red-400">{error || t('Error fetching projects')}</p>
        )}

        {/* Projects List */}
        {status === 'succeeded' && (
          <div className="mt-4 space-y-6">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-teal-50 dark:hover:bg-teal-600"
                >
                  {/* Basic Info Section */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-black dark:text-white">
                        <FaBuilding className="inline mr-2" /> {t('Project Name')}: {project.data.projectName}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        <FaMapMarkedAlt className="inline mr-2" /> {t('Location')}: {project.data.location}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleProject(project.id)}
                      className="text-teal-500 dark:text-teal-400 hover:underline"
                    >
                      {openProjectId === project.id ? t('Hide Details') : t('Show Details')}
                    </button>
                  </div>

                  {/* Detailed Info Section (Collapsible) */}
                  {openProjectId === project.id && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <span className="font-semibold text-black dark:text-white">
                          <FaRegFileAlt className="inline mr-2" /> {t('Area')}:
                        </span>
                        <span className="text-sm text-black dark:text-white">
                          {project.data.area}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-black dark:text-white">
                          <FaRegFileAlt className="inline mr-2" /> {t('DTPC Number')}:
                        </span>
                        <span className="text-sm text-black dark:text-white">
                          {project.data.dtpcNumber}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-black dark:text-white">
                          <FaCheckCircle className="inline mr-2" /> {t('Local Body Approval')}:
                        </span>
                        <span className="text-sm text-black dark:text-white">
                          {project.data.localBodyApproval}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-black dark:text-white">
                          <FaCheckCircle className="inline mr-2" /> {t('RERC App No')}:
                        </span>
                        <span className="text-sm text-black dark:text-white">
                          {project.data.rercAppNo}
                        </span>
                      </div>

                      {/* Parent Documents (if available) */}
                      {project.data.parentDocuments && Object.keys(project.data.parentDocuments).length > 0 && (
                        <div className="mt-2">
                          <span className="font-semibold text-black dark:text-white">
                            <FaDownload className="inline mr-2" /> {t('Parent Documents')}:
                          </span>
                          <ul className="list-disc pl-5">
                            {Object.keys(project.data.parentDocuments).map((doc, idx) => (
                              <li key={idx}>{t('Document')} {doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Uploaded Documents (if available) */}
                      {project.data.uploadedDocuments && Object.keys(project.data.uploadedDocuments).length > 0 && (
                        <div className="mt-2">
                          <span className="font-semibold text-black dark:text-white">
                            <FaDownload className="inline mr-2" /> {t('Uploaded Documents')}:
                          </span>
                          <ul className="list-disc pl-5">
                            {Object.keys(project.data.uploadedDocuments).map((doc, idx) => (
                              <li key={idx}>{t('Document')} {doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* View More Link */}
                      <div className="mt-4">
                        <Link href={`/ProjectDetails/${project.id}/${customerId}`} className="text-teal-500 dark:text-teal-400 hover:underline">
                          {t('View More Details')}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300">{t('No projects available')}</p>
            )}
          </div>
        )}

        {/* Add New Project Button */}
        <button className="w-full mt-6 p-3 bg-teal-500 text-white rounded-lg font-medium text-center hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-400">
          <Link href={`/addProject`} className="text-white hover:underline mt-2 block">
            {t('+ Add New Project')}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Projects;
