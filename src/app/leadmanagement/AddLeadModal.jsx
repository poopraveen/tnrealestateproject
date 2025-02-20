"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setLeads } from "../../store/slices/dataSlice";

const AddLeadModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.data.leads); // Get existing leads from Redux
  const generateRandomValue: any = () => {
  const names: any = ["John Doe", "Alice Smith", "Bob Johnson", "Charlie Brown", "Dana White"];
  const phoneNumbers: any = ["+1-234-567-8901", "+1-345-678-9012", "+1-456-789-0123", "+1-567-890-1234", "+1-678-901-2345"];
  const addresses: any = ["123 Elm St, Springfield, IL, 62701","456 Oak St, Lincoln, NE, 68508", "789 Pine St, Madison, WI, 53703","321 Maple Ave, Boston, MA, 02115", "654 Birch Blvd, Austin, TX, 73301"];
  const requirements: any = [
    "Urgent request for delivery", 
    "Looking for quick advice on a purchase", 
    "Interested in a service demo", 
    "Scheduled appointment for consultation", 
    "Order status inquiry"
  ];

  return {
    name: names[Math.floor(Math.random() * names.length)],
    phone: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
    date: new Date().toISOString().split("T")[0], // Current date
    address: addresses[Math.floor(Math.random() * addresses.length)],
    requirement: requirements[Math.floor(Math.random() * requirements.length)],
  };
}
  // Formik Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    phone: Yup.string().matches(/^\d+$/, "Phone number must be digits").required("Phone number is required"),
    date: Yup.date().required("Date is required"),
    address: Yup.string().required("Address is required"),
    requirement: Yup.string().required("Requirement is required"),
  });

  // Formik Form Handling
  const formik = useFormik({
    initialValues:generateRandomValue(),
    validationSchema,
    onSubmit: (values) => {
      const newLead = {
        id: Date.now(), // Temporary unique ID
        name: values.name,
        date: values.date,
        status: "new",
      };

      // ✅ Update Redux State (Append New Lead)
      dispatch(setLeads([...leads, newLead]));

      onClose(); // Close modal
    },
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      aria-hidden={!isOpen}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transform transition-all scale-100">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Add New Lead</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Full Name */}
          <label className="block text-sm font-medium text-black dark:text-white">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onChange={formik.handleChange}
            value={formik.values.name}
            autoFocus
          />
          {formik.errors.name && <p className="text-red-500 text-xs">{formik.errors.name}</p>}

          {/* Phone Number */}
          <label className="block text-sm font-medium mt-3 text-black dark:text-white">Phone Number</label>
          <input
            type="text"
            name="phone"
            className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone && <p className="text-red-500 text-xs">{formik.errors.phone}</p>}

          {/* Date */}
          <label className="block text-sm font-medium mt-3 text-black dark:text-white">Date</label>
          <input
            type="date"
            name="date"
            className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && <p className="text-red-500 text-xs">{formik.errors.date}</p>}

          {/* Address */}
          <label className="block text-sm font-medium mt-3 text-black dark:text-white">Address</label>
          <input
            type="text"
            name="address"
            className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik.errors.address && <p className="text-red-500 text-xs">{formik.errors.address}</p>}

          {/* Requirement */}
          <label className="block text-sm font-medium mt-3 text-black dark:text-white">Requirement</label>
          <textarea
            name="requirement"
            className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            onChange={formik.handleChange}
            value={formik.values.requirement}
          />
          {formik.errors.requirement && <p className="text-red-500 text-xs">{formik.errors.requirement}</p>}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">
            Submit
          </button>
        </form>

        {/* Close Button */}
        <button onClick={onClose} className="w-full text-gray-600 mt-2 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddLeadModal;
