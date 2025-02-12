import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Input } from "../components/ui/input";

interface Customer {
  name: string;
  advanceAmount: number;
  image: string;
}

const customers: Customer[] = [
  { name: "John Smith", advanceAmount: 5000, image: "/images/john.jpg" },
  { name: "Emily Johnson", advanceAmount: 3000, image: "/images/emily.jpg" },
  { name: "Michael Brown", advanceAmount: 7000, image: "/images/michael.jpg" },
  { name: "Sophia Davis", advanceAmount: 4000, image: "/images/sophia.jpg" },
  { name: "James Wilson", advanceAmount: 6000, image: "/images/james.jpg" },
];

const CustomerList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Customer Information</h1>
        <button className="bg-brown-700 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> Add
        </button>
      </div>
      <div className="mb-4">
        <Input placeholder="Search customers..." className="w-full p-2 border rounded" />
      </div>
      <div className="space-y-4">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="flex items-center bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={customer.image}
              alt={customer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-medium">{customer.name}</h2>
              <p className="text-gray-500">Advance Amount: ${customer.advanceAmount}</p>
            </div>
            <FiEdit2 className="text-gray-400 cursor-pointer" />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-around border-t">
        <button className="text-gray-600">🏠</button>
        <button className="text-gray-600">👤</button>
        <button className="text-gray-600">📄</button>
        <button className="text-gray-600">📍</button>
        <button className="text-gray-600">⚙️</button>
      </div>
    </div>
  );
};

export default CustomerList;
