'use client'
import React, { useEffect } from "react";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchCustomers } from '../../store/slices/customerSlice';
import { FiEdit2 } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Input } from "../components/ui/input";

const DEFAULT_IMAGE = "/icons/web-app-manifest-192x192.png";

const CustomerList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, status, error } = useSelector((state: RootState) => state.customers);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-black dark:text-white">Customer Information</h1>
        <button className="bg-brown-700 text-back px-4 py-2 rounded flex items-center gap-2 hover:bg-brown-600 dark:bg-brown-500 dark:text-gray-100 dark:hover:bg-brown-400">
          <Link href="/profile" className="flex items-center text-xl">
            <FaPlusCircle className="mr-2" /> {t('add')} {/* Added space between icon and text */}
          </Link>
        </button>
      </div>
      <div className="mb-4">
        <Input placeholder="Search customers..." className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>

      {/* Loading and error handling */}
      {status === 'loading' && <p>Loading customers...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

      {/* Customer List */}
      {/* Customer List */}
      <div className="space-y-4">
        {customers.map((customer: any) => (
          <div
            key={customer.id}
            className="flex items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md dark:border-gray-600"
          >
            <img
              src={customer?.data?.imageUrl || DEFAULT_IMAGE}
              alt={`${customer?.data?.personalDetails?.firstName} ${customer?.data?.personalDetails?.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-medium text-black dark:text-white">
                {customer?.data?.personalDetails?.firstName} {customer?.data?.personalDetails?.lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-300">
                Advance Amount: ${customer?.data?.financialDetails?.downPayment ?? 0}
              </p>
            </div>
            <Link href={`/edit-customer/${customer?.id}`}>
              <FiEdit2 className="text-gray-400 dark:text-gray-300 cursor-pointer" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
