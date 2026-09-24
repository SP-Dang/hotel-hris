import { Award, TrendingUp, Star, Wifi, WifiOff } from 'lucide-react';
import { performanceReviews as mockReviews, employees as mockEmployees } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function KPI() {
  const { connected } = useApiStatus();
  const { data: reviewsData, isLive } = useSheetData('61_Performance_Reviews', mockReviews);
  const { data: employeesData } = useSheetData('10_Employees', mockEmployees);

  const getEmpName = (id: string) => {
    const emp = employeesData.find((e: any) => e.Employee_ID === id);
    return emp ? emp.Full_Name : id;
  };

  const getRatingBadge = (r: string) => {
    if (r === 'Excellent') return 'bg-green-100 text-green-700';
    if (r === 'Very Good') return 'bg-blue-100 text-blue-700';
    if (r === 'Good') return 'bg-indigo-100 text-indigo-700';
    if (r === 'Average') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance & KPI</h1>
          <p className="text-gray-500 text-sm mt-1">61_Performance_Reviews • {reviewsData.length} reviews</p>
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
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><Star size={20} className="text-green-600" /></div>
          <div><p className="text-2xl font-bold">{reviewsData.filter((r: any) => r.Rating === 'Excellent').length}</p><p className="text-xs text-gray-500">Excellent</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><TrendingUp size={20} className="text-blue-600" /></div>
          <div><p className="text-2xl font-bold">{reviewsData.filter((r: any) => r.Rating === 'Very Good').length}</p><p className="text-xs text-gray-500">Very Good</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><Award size={20} className="text-indigo-600" /></div>
          <div><p className="text-2xl font-bold">{reviewsData.length}</p><p className="text-xs text-gray-500">Total Reviews</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Period</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">KPI Score</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Behavior</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Attendance</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Review Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reviewsData.map((r: any) => (
                <tr key={r.Review_ID} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{getEmpName(r.Employee_ID)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r.Review_Period}</td>
                  <td className="px-4 py-3 text-sm text-center">{r.KPI_Score}</td>
                  <td className="px-4 py-3 text-sm text-center">{r.Behavior_Score}</td>
                  <td className="px-4 py-3 text-sm text-center">{r.Attendance_Score}</td>
                  <td className="px-4 py-3 text-sm text-center font-bold">{r.Total_Score}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getRatingBadge(r.Rating)}`}>{r.Rating}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{r.Review_Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
