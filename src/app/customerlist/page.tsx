'use client'
import React from "react";
import Link from 'next/link';
import { FiEdit2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Input } from "../components/ui/input";

interface Customer {
  name: string;
  advanceAmount: number;
  image: string;
}

const customers: Customer[] = [
  { name: "John Smith", advanceAmount: 5000, image: "/icons/web-app-manifest-192x192.png" },
  { name: "Emily Johnson", advanceAmount: 3000, image: "/icons/web-app-manifest-192x192.png" },
  { name: "Michael Brown", advanceAmount: 7000, image: "/icons/web-app-manifest-192x192.png" },
  { name: "Sophia Davis", advanceAmount: 4000, image: "/icons/web-app-manifest-192x192.png" },
  { name: "James Wilson", advanceAmount: 6000, image: "/icons/web-app-manifest-192x192.png" },
];

const CustomerList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-black dark:text-white">Customer Information</h1>
        <button className="bg-brown-700 text-white px-4 py-2 rounded flex items-center gap-2">
        <Link href="/profile" className="text-xl"> <FaPlus /> Add </Link>
        </button>
      </div>
      <div className="mb-4">
        <Input placeholder="Search customers..." className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>
      <div className="space-y-4">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="flex items-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md dark:border-gray-600"
          >
            <img
              src={customer.image}
              alt={customer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-medium text-black dark:text-white">{customer.name}</h2>
              <p className="text-gray-500 dark:text-gray-300">Advance Amount: ${customer.advanceAmount}</p>
            </div>
            <FiEdit2 className="text-gray-400 dark:text-gray-300 cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
