'use client'
import React, { useState } from "react";

const leads = [
  { name: "John Smith", date: "2023-10-01" },
  { name: "Emily Johnson", date: "2023-10-02" },
  { name: "Michael Brown", date: "2023-10-03" },
  { name: "Sophia Davis", date: "2023-10-04" },
];

const LeadManagement = () => {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => window.history.back()} className="mr-2">⬅</button>
        <h1 className="text-lg font-semibold">Lead management</h1>
      </div>

      <div className="flex border-b mb-4">
        {[
          { key: "new", label: "New Leads" },
          { key: "pending", label: "Pending Leads" },
          { key: "finished", label: "Finished Leads" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab.key ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {leads.map((lead, index) => (
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
        ))}
      </div>

      <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg">
        ➕
      </button>
    </div>
  );
};

export default LeadManagement;
