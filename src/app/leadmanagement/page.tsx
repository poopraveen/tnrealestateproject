"use client";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCustomers } from "../../store/slices/customerSlice";
import { putProfileData } from "../../store/slices/profileSlice";
import AddLeadModal from "./AddLeadModal";
import { MoreVertical, FilePlus, Edit, Trash, Clock, Hourglass, CheckCircle } from "lucide-react";

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
  const dispatch = useDispatch<AppDispatch>();
  const { customers, status } = useSelector((state: RootState) => state.customers);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<string>("new");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customers.length > 0) {
      setLeads(transformLeads(customers));
    }
  }, [customers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const statusOrder = ["new", "pending", "finished"];

  const handleChangeStatus = (id: string, currentStatus: string) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = currentIndex < statusOrder.length - 1 ? statusOrder[currentIndex + 1] : currentStatus;

    const customer = customers.find(cust => cust.id === id);
    if (!customer) return;

    dispatch(putProfileData({ leadId: id, profileData: { status: nextStatus } }));
    setTimeout(() => {
      dispatch(fetchCustomers());
    }, 3000);
  };

  const transformLeads = (apiLeads: APILead[]): Lead[] => {
    return apiLeads.map((lead) => ({
      id: lead?.id,
      name: `${lead?.data?.personalDetails?.firstName} ${lead?.data?.personalDetails?.lastName}`,
      date: new Date().toISOString().split("T")[0],
      status: lead?.data?.status || "new",
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
        {[
          { key: "new", label: t("newLeads"), icon: <Clock size={16} className="mr-2" /> },
          { key: "pending", label: t("pendingLeads"), icon: <Hourglass size={16} className="mr-2" /> },
          { key: "finished", label: t("finishedLeads"), icon: <CheckCircle size={16} className="mr-2" /> },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center py-2 px-4 text-sm font-medium rounded-t-md transition-all duration-200
        ${activeTab === tab.key
                ? "bg-blue-500 text-white border-b-2 border-blue-700 dark:bg-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon} {tab.label}
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
                  <MoreVertical size={20} />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === index && (
                  <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-40 p-2 z-10 border border-gray-200 dark:border-gray-700">
                    <Link href={`/ProjectList/${lead.id}`}>
                      <button className="flex items-center w-full text-left px-2 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                        <FilePlus size={16} className="mr-2" />
                        {t('bookPlot')}
                      </button>
                    </Link>
                    <button
                      className="flex items-center w-full text-left px-2 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                      onClick={() => handleChangeStatus(lead.id, lead.status)}
                    >
                      <Edit size={16} className="mr-2" />
                      {t('changeStatus')}
                    </button>
                    <button
                      className="flex items-center w-full text-left px-2 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                    >
                      <Trash size={16} className="mr-2" />
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

      {/* Floating Add Button */}
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
