"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const PlotDetailsForm = () => {
  const formik = useFormik({
    initialValues: {
      plotName: "",
      plotNumber: "",
      plotBoundaryNorth: "",
      plotBoundarySouth: "",
      plotBoundaryEast: "",
      plotBoundaryWest: "",
      plotFacingNorth: false,
      plotFacingSouth: false,
      plotFacingEast: false,
      plotFacingWest: false,
      plotCorner: false,
      plotStatus: "Booked",
    },
    validationSchema: Yup.object({
      plotName: Yup.string().required("Plot Name is required"),
      plotNumber: Yup.string().required("Plot Number is required"),
      plotBoundaryNorth: Yup.string().required("Required"),
      plotBoundarySouth: Yup.string().required("Required"),
      plotBoundaryEast: Yup.string().required("Required"),
      plotBoundaryWest: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      alert("Plot details submitted successfully!");
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Plot Details</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* Plot Name & Plot Number Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <div>
            <label className="block font-medium">Plot Name</label>
            <input
              type="text"
              placeholder="Enter Plot Name"
              className="w-full border p-2 rounded-md"
              value={formik.values.plotName}
              onChange={formik.handleChange}
              name="plotName"
            />
            {formik.touched.plotName && formik.errors.plotName && (
              <p className="text-red-500 text-sm">{formik.errors.plotName}</p>
            )}
          </div>
          <div className="mt-2">
            <label className="block font-medium">Plot Number</label>
            <input
              type="text"
              placeholder="Enter Plot Number"
              className="w-full border p-2 rounded-md"
              value={formik.values.plotNumber}
              onChange={formik.handleChange}
              name="plotNumber"
            />
            {formik.touched.plotNumber && formik.errors.plotNumber && (
              <p className="text-red-500 text-sm">{formik.errors.plotNumber}</p>
            )}
          </div>
        </div>

        {/* Plot Boundary Information Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Boundary Information</h3>
          {(["North", "South", "East", "West"] as const).map((direction) => (
            <div key={direction} className="mt-2">
              <label className="block font-medium">Boundary ({direction})</label>
              <input
                type="text"
                name={`plotBoundary${direction}`}
                placeholder="Enter Boundary"
                className="w-full border p-2 rounded-md"
                value={(formik.values[`plotBoundary${direction}` as keyof typeof formik.values] as string) || ""}
                onChange={formik.handleChange}
              />
              {formik.touched[`plotBoundary${direction}` as keyof typeof formik.touched] &&
                formik.errors[`plotBoundary${direction}` as keyof typeof formik.errors] && (
                  <p className="text-red-500 text-sm">
                    {formik.errors[`plotBoundary${direction}` as keyof typeof formik.errors]}
                  </p>
                )}
            </div>
          ))}
        </div>

        {/* Plot Facing Information Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Facing Information</h3>
          {(["North", "South", "East", "West"] as const).map((direction) => (
            <div key={direction} className="flex items-center justify-between mt-2">
              <span>Facing ({direction})</span>
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
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Corner Plot Information</h3>
          <div className="flex items-center justify-between">
            <span>Corner Plot</span>
            <input
              type="checkbox"
              name="plotCorner"
              className="h-5 w-5"
              checked={formik.values.plotCorner}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Plot Status Dropdown */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <select
            name="plotStatus"
            className="w-full border p-2 rounded-md"
            value={formik.values.plotStatus}
            onChange={formik.handleChange}
          >
            <option value="Booked">Booked</option>
            <option value="Available">Available</option>
            <option value="Hold">Hold</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
};

export default PlotDetailsForm;
