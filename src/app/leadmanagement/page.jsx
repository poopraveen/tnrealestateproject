"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { fetchLeads } from "../../store/slices/dataSlice";
import AddLeadModal from "./AddLeadModal";

const LeadManagement = () => {
    const dispatch = useDispatch();
    const { leads, status } = useSelector((state) => state.data);
    const [activeTab, setActiveTab] = useState("new");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        dispatch(fetchLeads());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center mb-4">
                <button onClick={() => window.history.back()} className="mr-2 text-black dark:text-white">⬅</button>
                <h1 className="text-lg font-semibold text-black dark:text-white">Lead Management</h1>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-4">
                {["new", "pending", "finished"].map((tab) => (
                    <button
                        key={tab}
                        className={`py-2 px-4 text-sm font-medium ${activeTab === tab ? "border-b-2 border-black dark:border-white" : "text-gray-500 dark:text-gray-300"}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} Leads
                    </button>
                ))}
            </div>

            {/* Loading & Error Handling */}
            {status === "loading" && <p className="text-black dark:text-white">Loading leads...</p>}
            {status === "failed" && <p className="text-red-500">Failed to load leads.</p>}

            {/* Lead List */}
            <div className="space-y-4">
                {leads?.length > 0 ? (
                    leads.filter((lead) => lead.status === activeTab).map((lead, index) => (
                        <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm relative">
                            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 flex items-center justify-center rounded-full mr-4">👤</div>
                            <div className="flex-1">
                                <h2 className="text-md font-medium text-black dark:text-white">{lead.name}</h2>
                                <p className="text-gray-500 text-sm dark:text-gray-300">{lead.date}</p>
                            </div>

                            {/* Kebab Menu Button */}
                            <button className="text-gray-600 dark:text-gray-200 text-xl" onClick={() => setOpenDropdown(openDropdown === index ? null : index)}>
                                ⋮
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === index && (
                                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-32 p-2 z-10">
                                    <Link href="/ProjectList">
                                        <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600">Book Plot</button>
                                    </Link>
                                    <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600">Change Status</button>
                                    <button className="block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600">Delete</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No leads available.</p>
                )}
            </div>

            {/* Floating Add Button - Moved Up */}
            <button onClick={() => setIsModalOpen(true)} className="fixed bottom-16 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600">
                ➕
            </button>

            {/* Modal */}
            <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default LeadManagement;
