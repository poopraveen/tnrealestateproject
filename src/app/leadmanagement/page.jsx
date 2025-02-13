"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { fetchLeads } from "../../store/slices/dataSlice";

const LeadManagement = () => {
   const dispatch = useDispatch();
  const { leads, status } = useSelector((state) => state.data);
  const [activeTab, setActiveTab] = useState("new");

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => window.history.back()} className="mr-2">⬅</button>
        <h1 className="text-lg font-semibold">Lead Management</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {["new", "pending", "finished"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Leads
          </button>
        ))}
      </div>

      {/* Loading & Error Handling */}
      {status === "loading" && <p>Loading leads...</p>}
      {status === "failed" && <p className="text-red-500">Failed to load leads.</p>}

      {/* Lead List */}
      <div className="space-y-4">
        {leads?.length > 0 ? (
          leads
            .filter((lead) => lead.status === activeTab)
            .map((lead, index) => (
              <div key={index} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-full mr-4">
                  👤
                </div>
                <div className="flex-1">
                  <h2 className="text-md font-medium">{lead.name}</h2>
                  <p className="text-gray-500 text-sm">{lead.date}</p>
                </div>
                <button className="text-gray-600">▼</button>
              </div>
            ))
        ) : (
          <p className="text-gray-500">No leads available.</p>
        )}
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg">
        ➕
      </button>
    </div>
  );
};

export default LeadManagement;
