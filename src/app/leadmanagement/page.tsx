"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCustomers } from "../../store/slices/customerSlice";
import { putProfileData } from "../../store/slices/profileSlice";
import AddLeadModal from "./AddLeadModal";

interface APILead {
  id: string;
  data: {
    personalDetails: {
      firstName: string;
      lastName: string;
    };
    status?: string;
  };
  status?: string;
}

interface Lead {
  id: string;
  name: string;
  date: string;
  status: string;
}

const LeadManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch
  const { customers, status } = useSelector((state: RootState) => state.customers);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<string>("new");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customers.length > 0) {
        debugger
        console.log(transformLeads(customers))
      setLeads(transformLeads(customers));
    }
  }, [customers]);

  const statusOrder = ["new", "pending", "finished"];

  const handleChangeStatus = (id: string, currentStatus: string) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = currentIndex < statusOrder.length - 1 ? statusOrder[currentIndex + 1] : currentStatus;

    // Find the customer by id
    const customer = customers.find(cust => cust.id === id);
    
    if (!customer) return; // If customer not found, do nothing

    // Create a new object with updated status
    // const updatedCustomer = {
    //     ...customer,
    //     data: {
    //         ...customer.data,
    //         status: nextStatus
    //     }
    // };

    // Dispatch the updated customer data
    dispatch(putProfileData({ leadId: id, profileData: { status: nextStatus} }));
    setTimeout(()=>{
        dispatch(fetchCustomers());
    }, 3000)
    
};


  const transformLeads = (apiLeads: APILead[]): Lead[] => {
    return apiLeads.map((lead) => ({
      id: lead?.id,
      name: `${lead?.data?.personalDetails?.firstName} ${lead?.data?.personalDetails?.lastName}`,
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      status: lead?.data?.status || "new", // Default to "new" if status is missing
    }));
  };
  const { t } = useTranslation();

   return (
    <div className="min-h-screen bg-white dark:bg-gray-800 p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => window.history.back()} className="mr-2 text-black dark:text-white">
          ⬅
        </button>
        <h1 className="text-lg font-semibold text-black dark:text-white">{t('leadManagement')}</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {["new", "pending", "finished"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium ${activeTab === tab ? "border-b-2 border-black dark:border-white" : "text-gray-500 dark:text-gray-300"}`}
            onClick={() => setActiveTab(tab)}
          >
            {t(`${tab}Leads`)}
          </button>
        ))}
      </div>

      {/* Loading & Error Handling */}
      {status === "loading" && <p className="text-black dark:text-white">{t('loadingLeads')}</p>}
      {status === "failed" && <p className="text-red-500">{t('failedLoadingLeads')}</p>}

      {/* Lead List */}
      <div className="space-y-4">
        {leads.length > 0 ? (
          leads
            .filter((lead) => lead.status === activeTab)
            .map((lead, index) => (
              <div
                key={lead.id}
                className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm relative"
              >
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 flex items-center justify-center rounded-full mr-4">
                  👤
                </div>
                <div className="flex-1">
                  <h2 className="text-md font-medium text-black dark:text-white">{lead.name}</h2>
                  <p className="text-gray-500 text-sm dark:text-gray-300">{lead.date}</p>
                </div>

                {/* Kebab Menu Button */}
                <button
                  className="text-gray-600 dark:text-gray-200 text-xl"
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                >
                  ⋮
                </button>

                {/* Dropdown Menu */}
                {openDropdown === index && (
                  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-32 p-2 z-10">
                    <Link href="/ProjectList">
                      <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600">
                        {t('bookPlot')}
                      </button>
                    </Link>
                    <button
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleChangeStatus(lead.id, lead.status)}
                    >
                      {t('changeStatus')}
                    </button>
                    <button className="block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600">
                      {t('delete')}
                    </button>
                  </div>
                )}
              </div>
            ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">{t('noLeads')}</p>
        )}
      </div>

      {/* Floating Add Button - Moved Up */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-16 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        ➕
      </button>

      {/* Modal */}
      <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LeadManagement;
