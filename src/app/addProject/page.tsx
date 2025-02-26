'use client';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation
import { addProjectData, initializeProjects, selectProjectsState } from "../../store/slices/projectSlice"; // Assuming the action is named this
import { useLoaderContext } from '../../app/LoaderContext';  // Adjust path
import FullPageLoader from '../components/Loader';  // Adjust path

interface FormValues {
    projectName: string;
    location: string;
    area: string;
    dtpcNumber: string;
    localBodyApproval: string;
    rercAppNo: string;
    parentDocuments: FileList | null;
    uploadedDocuments: FileList | null;
}

const AddNewProject = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { Addstatus: status} = useSelector(selectProjectsState);
    const { isLoading, startLoading, stopLoading } = useLoaderContext();

    useEffect(() => {
        dispatch(initializeProjects());
    }, [dispatch])

    // Check if the component is rendered on the client side
    useEffect(() => {
        // Only try to redirect if the component is on the client side
        if (status === "succeeded") {
            stopLoading();
            router.push("/ProjectList");
        }
    }, [status, router, stopLoading]);

    const generateRandomValues = () => {
        const randomString = (length: number) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        };

        const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

        return {
            projectName: `Project ${randomString(5)}`,          // Random project name
            location: `Location ${randomString(5)}`,            // Random location
            area: `${randomNumber(1000, 10000)} sq ft`,         // Random area (in sq ft)
            dtpcNumber: `DTPC${randomNumber(1000, 9999)}`,      // Random DTPC number
            localBodyApproval: `LBA${randomNumber(100, 999)}`,  // Random Local Body Approval number
            rercAppNo: `RERC${randomNumber(10000, 99999)}`,     // Random RERC App number
            parentDocuments: null,                              // You could generate random file data if needed
            uploadedDocuments: null,                            // Same as parent documents
        };
    };


    // Initialize Formik
    const formik = useFormik<FormValues>({
        initialValues: generateRandomValues(),
        validationSchema: Yup.object({
            projectName: Yup.string().required(t("Project Name is required")),
            location: Yup.string().required(t("Location is required")),
            area: Yup.string().required(t("Area is required")),
            dtpcNumber: Yup.string().required(t("DTPC Approved Number is required")),
            localBodyApproval: Yup.string().required(t("Localbody Approval Number is required")),
            rercAppNo: Yup.string().required(t("Rerc App No is required")),
            parentDocuments: Yup.mixed().nullable(),//required(t("Parent documents are required"))
            uploadedDocuments: Yup.mixed().nullable() //.required(t("Uploaded documents are required")),
        }),
        onSubmit: (values) => {
            startLoading();
            dispatch(addProjectData({
                data: values,  // Passing the form values directly
                plots: []  // Make sure this matches the expected structure
            }));
        },
    });


    return (
        <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
            <form onSubmit={formik.handleSubmit} className="space-y-6 p-6">
                {/* Project Details Section */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("Project Details")}</h2>
                    <div className="mb-4">
                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("Project Name")}
                        </label>
                        <input
                            id="projectName"
                            name="projectName"
                            type="text"
                            value={formik.values.projectName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {formik.touched.projectName && formik.errors.projectName ? (
                            <div className="text-red-500 text-sm">{formik.errors.projectName}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("Location")}
                        </label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {formik.touched.location && formik.errors.location ? (
                            <div className="text-red-500 text-sm">{formik.errors.location}</div>
                        ) : null}
                    </div>
                </div>

                {/* Additional Information Section */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("Additional Information")}</h2>
                    <div className="mb-4">
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("Area")}
                        </label>
                        <input
                            id="area"
                            name="area"
                            type="text"
                            value={formik.values.area}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {formik.touched.area && formik.errors.area ? (
                            <div className="text-red-500 text-sm">{formik.errors.area}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dtpcNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("DTPC Approved Number")}
                        </label>
                        <input
                            id="dtpcNumber"
                            name="dtpcNumber"
                            type="text"
                            value={formik.values.dtpcNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {formik.touched.dtpcNumber && formik.errors.dtpcNumber ? (
                            <div className="text-red-500 text-sm">{formik.errors.dtpcNumber}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="localBodyApproval" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("Localbody Approval Number")}
                        </label>
                        <input
                            id="localBodyApproval"
                            name="localBodyApproval"
                            type="text"
                            value={formik.values.localBodyApproval}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {formik.touched.localBodyApproval && formik.errors.localBodyApproval ? (
                            <div className="text-red-500 text-sm">{formik.errors.localBodyApproval}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rercAppNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("Rerc App No")}
                        </label>
                        <input
                            id="rercAppNo"
                            name="rercAppNo"
                            type="text"
                            value={formik.values.rercAppNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {formik.touched.rercAppNo && formik.errors.rercAppNo ? (
                            <div className="text-red-500 text-sm">{formik.errors.rercAppNo}</div>
                        ) : null}
                    </div>
                </div>

                {/* Parent Documents Section */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("Parent Documents")}</h2>
                    <div className="mb-4">
                        <label htmlFor="parentDocuments" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("Upload Parent Documents")}
                        </label>
                        <input
                            type="file"
                            multiple
                            name="parentDocuments"
                            onChange={(e) => formik.setFieldValue("parentDocuments", e.target.files)}
                            id="parentDocuments"
                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {formik.touched.parentDocuments && formik.errors.parentDocuments ? (
                            <div className="text-red-500 text-sm">{formik.errors.parentDocuments}</div>
                        ) : null}
                    </div>
                </div>

                {/* Documents Section */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("Uploaded Documents")}</h2>
                    <div className="mb-4">
                        <label htmlFor="uploadedDocuments" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t("Upload Documents")}
                        </label>
                        <input
                            type="file"
                            multiple
                            name="uploadedDocuments"
                            onChange={(e) => formik.setFieldValue("uploadedDocuments", e.target.files)}
                            id="uploadedDocuments"
                            className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        {formik.touched.uploadedDocuments && formik.errors.uploadedDocuments ? (
                            <div className="text-red-500 text-sm">{formik.errors.uploadedDocuments}</div>
                        ) : null}
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => {/* handle cancel */ }} className="p-3 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
                        {t("Cancel")}
                    </button>
                    <button type="submit" className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        {t("Save")}
                    </button>
                </div>
            </form>
            {isLoading && <FullPageLoader />}
        </div>
    );
};

export default AddNewProject;
