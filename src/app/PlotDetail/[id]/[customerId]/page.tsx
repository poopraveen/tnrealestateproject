"use client";
import {useState, useEffect} from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import {updateCustomerData} from '../../../../store/slices/editCustomerSlice'
import { addPlot, selectAddPlotStatus, selectAddPlotData } from '../../../../store/slices/plotSlice';
import { selectProjectById } from '../../../../store/slices/projectSlice';
import { selectCustomerById } from '../../../../store/slices/customerSlice';
import { putProfileData } from '../../../../store/slices/profileSlice';

const getRandomPlotNumber = () => Math.floor(100 + Math.random() * 900);
const getRandomBoolean = () => Boolean(Math.round(Math.random()));
const getRandomDirection = () => ["North", "South", "East", "West"][Math.floor(Math.random() * 4)];
const getRandomStatus = () => ["Booked", "Available", "Hold"][Math.floor(Math.random() * 3)];

const PlotDetailsForm = () => {
  const { t } = useTranslation();
    const { id, customerId } = useParams();  // Get project ID from URL params
  const project = useSelector((state: RootState) => selectProjectById(state, id));
  const customerDetails: any = useSelector((state: RootState) => selectCustomerById(state, customerId));
  
  const dispatch = useDispatch();
  const router = useRouter()
  const addPlotStatus = useSelector(selectAddPlotStatus);
  const selectPlotData = useSelector(selectAddPlotData);
  const formik = useFormik({
    initialValues: {
      plotName: "Plot " + getRandomPlotNumber(),
      plotNumber: getRandomPlotNumber().toString(),
      plotBoundaryNorth: getRandomDirection(),
      plotBoundarySouth: getRandomDirection(),
      plotBoundaryEast: getRandomDirection(),
      plotBoundaryWest: getRandomDirection(),
      plotFacingNorth: getRandomBoolean(),
      plotFacingSouth: getRandomBoolean(),
      plotFacingEast: getRandomBoolean(),
      plotFacingWest: getRandomBoolean(),
      plotCorner: getRandomBoolean(),
      plotStatus: getRandomStatus(),
    },
    validationSchema: Yup.object({
      plotName: Yup.string().required(t("required")),
      plotNumber: Yup.string().required(t("required")),
      plotBoundaryNorth: Yup.string().required(t("required")),
      plotBoundarySouth: Yup.string().required(t("required")),
      plotBoundaryEast: Yup.string().required(t("required")),
      plotBoundaryWest: Yup.string().required(t("required")),
    }),
    onSubmit: (values) => {
      console.log('project data', project)
      console.log("Form submitted:", values);
      if (values) {
        dispatch(addPlot({
          data: {...values, profile: customerDetails}, "projectId": id,
          "phaseId": "A"
        }));
      }
      alert(t("plotDetailsSubmitted"));
    },
  });

  useEffect(() => {
    console.log("final submitted data for customer", { ...customerDetails, projects: { ...project, plots: selectPlotData } })
    if (addPlotStatus == 'succeeded') {
      dispatch(putProfileData({ leadId: customerDetails.id, profileData: { status: 'finished', projects: { ...project, plots: selectPlotData } } }));
      //dispatch(updateCustomerData({ ...customerDetails, projects: { ...project, plots: selectPlotData } }))
      router.push(`/ProjectDetails/${id}/${customerId}`);  // Redirect to customer list or any other page after update
    }
  }, [addPlotStatus])

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      <h2 className="text-xl font-semibold text-center mb-4 text-black dark:text-white">
        {t("plotDetails")}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            {t("basicInformation")}
          </h3>
          <label className="block font-medium text-black dark:text-white">{t("plotName")}</label>
          <input type="text" className="w-full border p-2 rounded-md" {...formik.getFieldProps("plotName")} />
          {formik.touched.plotName && formik.errors.plotName && (
            <p className="text-red-500 text-sm">{formik.errors.plotName}</p>
          )}
          <label className="block font-medium text-black dark:text-white mt-2">{t("plotNumber")}</label>
          <input type="text" className="w-full border p-2 rounded-md" {...formik.getFieldProps("plotNumber")} />
          {formik.touched.plotNumber && formik.errors.plotNumber && (
            <p className="text-red-500 text-sm">{formik.errors.plotNumber}</p>
          )}
        </div>

        {/* Boundary Information */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{t("boundaryInformation")}</h3>
          {["North", "South", "East", "West"].map((direction) => (
            <div key={direction} className="mt-2">
              <label className="block font-medium text-black dark:text-white">
                {t("boundary")}: {t(direction.toLowerCase())}
              </label>
              <input type="text" className="w-full border p-2 rounded-md" {...formik.getFieldProps(`plotBoundary${direction}`)} />
            </div>
          ))}
        </div>

        {/* Plot Status */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{t("status")}</h3>
          <select className="w-full border p-2 rounded-md" {...formik.getFieldProps("plotStatus")}>
            {["Booked", "Available", "Hold"].map((status) => (
              <option key={status} value={status}>{t(status.toLowerCase())}</option>
            ))}
          </select>
        </div>


        {/* Plot Facing Information Card */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            {t("facingInformation")}
          </h3>
          {(["North", "South", "East", "West"] as const).map((direction) => (
            <div key={direction} className="flex items-center justify-between mt-2">
              <span className="text-black dark:text-white">{t(direction.toLowerCase())}</span>
              <input
                type="checkbox"
                name={`plotFacing${direction}`}
                className="h-5 w-5"
                checked={formik.values[`plotFacing${direction}` as keyof typeof formik.values] as boolean}
                onChange={formik.handleChange}
              />
            </div>
          ))}
        </div>

        {/* Plot Corner Information Card */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            {t("cornerPlotInformation")}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-black dark:text-white">{t("cornerPlot")}</span>
            <input
              type="checkbox"
              name="plotCorner"
              className="h-5 w-5"
              checked={formik.values.plotCorner}
              onChange={formik.handleChange}
            />
          </div>
        </div>


        {/* Submit & Cancel */}
        <div className="flex justify-between mt-4">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md">{t("cancel")}</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlotDetailsForm;




// "use client";

// import { useFormik } from "formik";
// import * as Yup from "yup";

// const PlotDetailsForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       plotName: "",
//       plotNumber: "",
//       plotBoundaryNorth: "",
//       plotBoundarySouth: "",
//       plotBoundaryEast: "",
//       plotBoundaryWest: "",
//       plotFacingNorth: false,
//       plotFacingSouth: false,
//       plotFacingEast: false,
//       plotFacingWest: false,
//       plotCorner: false,
//       plotStatus: "Booked",
//     },
//     validationSchema: Yup.object({
//       plotName: Yup.string().required("Plot Name is required"),
//       plotNumber: Yup.string().required("Plot Number is required"),
//       plotBoundaryNorth: Yup.string().required("Required"),
//       plotBoundarySouth: Yup.string().required("Required"),
//       plotBoundaryEast: Yup.string().required("Required"),
//       plotBoundaryWest: Yup.string().required("Required"),
//     }),
//     onSubmit: (values) => {
//       console.log("Form submitted:", values);
//       alert("Plot details submitted successfully!");
//     },
//   });

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
//       <h2 className="text-xl font-semibold text-center mb-4 text-black dark:text-white">Plot Details</h2>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">

//         {/* Plot Name & Plot Number Card */}
//         <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Basic Information</h3>
//           <div>
//             <label className="block font-medium text-black dark:text-white">Plot Name</label>
//             <input
//               type="text"
//               placeholder="Enter Plot Name"
//               className="w-full border dark:bg-gray-600 p-2 rounded-md text-black dark:text-white"
//               value={formik.values.plotName}
//               onChange={formik.handleChange}
//               name="plotName"
//             />
//             {formik.touched.plotName && formik.errors.plotName && (
//               <p className="text-red-500 text-sm">{formik.errors.plotName}</p>
//             )}
//           </div>
//           <div className="mt-2">
//             <label className="block font-medium text-black dark:text-white">Plot Number</label>
//             <input
//               type="text"
//               placeholder="Enter Plot Number"
//               className="w-full border dark:bg-gray-600 p-2 rounded-md text-black dark:text-white"
//               value={formik.values.plotNumber}
//               onChange={formik.handleChange}
//               name="plotNumber"
//             />
//             {formik.touched.plotNumber && formik.errors.plotNumber && (
//               <p className="text-red-500 text-sm">{formik.errors.plotNumber}</p>
//             )}
//           </div>
//         </div>

//         {/* Plot Boundary Information Card */}
//         <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Boundary Information</h3>
//           {(["North", "South", "East", "West"] as const).map((direction) => (
//             <div key={direction} className="mt-2">
//               <label className="block font-medium text-black dark:text-white">Boundary ({direction})</label>
//               <input
//                 type="text"
//                 name={`plotBoundary${direction}`}
//                 placeholder="Enter Boundary"
//                 className="w-full border dark:bg-gray-600 p-2 rounded-md text-black dark:text-white"
//                 value={(formik.values[`plotBoundary${direction}` as keyof typeof formik.values] as string) || ""}
//                 onChange={formik.handleChange}
//               />
//               {formik.touched[`plotBoundary${direction}` as keyof typeof formik.touched] &&
//                 formik.errors[`plotBoundary${direction}` as keyof typeof formik.errors] && (
//                   <p className="text-red-500 text-sm">
//                     {formik.errors[`plotBoundary${direction}` as keyof typeof formik.errors]}
//                   </p>
//                 )}
//             </div>
//           ))}
//         </div>

//         {/* Plot Facing Information Card */}
//         <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Facing Information</h3>
//           {(["North", "South", "East", "West"] as const).map((direction) => (
//             <div key={direction} className="flex items-center justify-between mt-2">
//               <span className="text-black dark:text-white">Facing ({direction})</span>
//               <input
//                 type="checkbox"
//                 name={`plotFacing${direction}`}
//                 className="h-5 w-5"
//                 checked={formik.values[`plotFacing${direction}` as keyof typeof formik.values] as boolean}
//                 onChange={formik.handleChange}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Plot Corner Information Card */}
//         <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Corner Plot Information</h3>
//           <div className="flex items-center justify-between">
//             <span className="text-black dark:text-white">Corner Plot</span>
//             <input
//               type="checkbox"
//               name="plotCorner"
//               className="h-5 w-5"
//               checked={formik.values.plotCorner}
//               onChange={formik.handleChange}
//             />
//           </div>
//         </div>

//         {/* Plot Status Dropdown */}
//         <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Status</h3>
//           <select
//             name="plotStatus"
//             className="w-full border dark:bg-gray-600 p-2 rounded-md text-black dark:text-white"
//             value={formik.values.plotStatus}
//             onChange={formik.handleChange}
//           >
//             <option value="Booked">Booked</option>
//             <option value="Available">Available</option>
//             <option value="Hold">Hold</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-4">
//           <button type="button" className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-md">
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             Save
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// };

// export default PlotDetailsForm;
