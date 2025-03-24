'use client';

import React, { useEffect, useState } from 'react';
import { add, differenceInDays } from 'date-fns';
import { CheckCircle, XCircle, Hourglass } from 'lucide-react';

interface DataRow {
  'Reg No:': number;
  'DUE DATE'?: string;
  lastUpdateDateTime: string;
  'Fees Options': number;
  expiredDays?: number;
  rowColor?: string;
  inValidList?: boolean;
}

const baseUrl = `https://chipper-toffee-e75e3f.netlify.app/.netlify/functions/api`; // Replace with actual API URL

const DataTable: React.FC = () => {
  const [tableData, setTableData] = useState<DataRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/list`);
        const data: DataRow[] = await response.json();

        const updatedData = data.map((row) => {
          let dueDate = row['DUE DATE'] ? new Date(row['DUE DATE']) : undefined;
          if (!dueDate) {
            dueDate = add(new Date(row.lastUpdateDateTime), { months: row['Fees Options'] });
          }

          const daysDiff = differenceInDays(dueDate, new Date());
          const rowColor =
            isNaN(daysDiff) || daysDiff < -90
              ? 'bg-yellow-200'
              : daysDiff >= -90 && daysDiff <= 0
              ? 'bg-red-200'
              : 'bg-green-200';

          return {
            ...row,
            'DUE DATE': dueDate.toISOString(),
            expiredDays: Math.abs(daysDiff),
            rowColor,
          };
        });

        setTableData(updatedData.filter((row) => row.rowColor !== 'bg-yellow-200'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Data</h2>
      <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-sm uppercase">
              <th className="p-4 border">Reg No</th>
              <th className="p-4 border">Due Date</th>
              <th className="p-4 border">Expired Days</th>
              <th className="p-4 border text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row['Reg No:']} className={`text-center hover:bg-gray-100 transition-all ${row.rowColor}`}>
                <td className="p-4 border font-medium">{row['Reg No:']}</td>
                <td className="p-4 border">{row['DUE DATE']?.split('T')[0]}</td>
                <td className="p-4 border">{row.expiredDays}</td>
                <td className="p-4 border flex justify-center items-center space-x-2">
                  {row.rowColor === 'bg-red-200' ? (
                    <XCircle className="text-red-600 w-5 h-5" />
                  ) : row.rowColor === 'bg-yellow-200' ? (
                    <Hourglass className="text-yellow-600 w-5 h-5" />
                  ) : (
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  )}
                  <span className="text-sm font-semibold">
                    {row.rowColor === 'bg-red-200' ? 'Not Paid' : row.rowColor === 'bg-yellow-200' ? 'Inactive' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
