import { GraduationCap, CheckCircle, Clock, Wifi, WifiOff } from 'lucide-react';
import { trainingRecords as mockTraining, employees as mockEmployees } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function Training() {
  const { connected } = useApiStatus();
  const { data: trainingData, isLive } = useSheetData('71_Training_Records', mockTraining);
  const { data: employeesData } = useSheetData('10_Employees', mockEmployees);

  const getEmpName = (id: string) => {
    const emp = employeesData.find((e: any) => e.Employee_ID === id);
    return emp ? emp.Full_Name : id;
  };

  const completed = trainingData.filter((t: any) => t.Completion_Status === 'Completed').length;
  const inProgress = trainingData.filter((t: any) => t.Completion_Status === 'In Progress').length;

  const getStatusBadge = (s: string) => {
    if (s === 'Completed') return 'bg-green-100 text-green-700';
    if (s === 'In Progress') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training</h1>
          <p className="text-gray-500 text-sm mt-1">71_Training_Records • {trainingData.length} records</p>
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
          <div><p className="text-2xl font-bold">{completed}</p><p className="text-xs text-gray-500">Completed</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><Clock size={20} className="text-amber-600" /></div>
          <div><p className="text-2xl font-bold">{inProgress}</p><p className="text-xs text-gray-500">In Progress</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><GraduationCap size={20} className="text-indigo-600" /></div>
          <div><p className="text-2xl font-bold">{trainingData.length}</p><p className="text-xs text-gray-500">Total Records</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Course</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Training Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Score</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Certificate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {trainingData.map((t: any) => (
                <tr key={t.Training_Record_ID} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{getEmpName(t.Employee_ID)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.Course_Name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.Training_Date}</td>
                  <td className="px-4 py-3 text-sm text-center">{Number(t.Score) > 0 ? `${t.Score}%` : '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.Certificate_No || '-'}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadge(t.Completion_Status)}`}>{t.Completion_Status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
