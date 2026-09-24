import { FileText, AlertTriangle, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { documents as mockDocuments, employees as mockEmployees } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function Documents() {
  const { connected } = useApiStatus();
  const { data: documentsData, isLive } = useSheetData('20_Employee_Documents', mockDocuments);
  const { data: employeesData } = useSheetData('10_Employees', mockEmployees);

  const getEmpName = (id: string) => {
    const emp = employeesData.find((e: any) => e.Employee_ID === id);
    return emp ? emp.Full_Name : id;
  };

  const expiring = documentsData.filter((d: any) => d.Status === 'Expiring Soon');
  const valid = documentsData.filter((d: any) => d.Status === 'Valid');

  const getStatusBadge = (s: string) => {
    if (s === 'Valid') return 'bg-green-100 text-green-700';
    if (s === 'Expiring Soon') return 'bg-amber-100 text-amber-700';
    if (s === 'Expired') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 text-sm mt-1">20_Employee_Documents • {documentsData.length} documents</p>
        </div>
        {isLive ? (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <Wifi size={14} className="text-green-600" />
            <span className="text-xs font-medium text-green-700">Live Data</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
            <WifiOff size={14} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-600">Sample Data</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle size={20} className="text-green-600" /></div>
          <div><p className="text-2xl font-bold">{valid.length}</p><p className="text-xs text-gray-500">Valid Documents</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><AlertTriangle size={20} className="text-amber-600" /></div>
          <div><p className="text-2xl font-bold">{expiring.length}</p><p className="text-xs text-gray-500">Expiring Soon</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><FileText size={20} className="text-indigo-600" /></div>
          <div><p className="text-2xl font-bold">{documentsData.length}</p><p className="text-xs text-gray-500">Total Documents</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Document Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Document No</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Issue Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Expiry Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Reminder</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documentsData.map((d: any) => (
                <tr key={d.Document_ID} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{getEmpName(d.Employee_ID)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{d.Document_Type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{d.Document_Number}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{d.Issue_Date}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{d.Expiry_Date || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-center">{d.Renewal_Reminder_Days > 0 ? `${d.Renewal_Reminder_Days} days` : '-'}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadge(d.Status)}`}>{d.Status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
