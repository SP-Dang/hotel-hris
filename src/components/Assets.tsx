import { Briefcase, CheckCircle, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { assets as mockAssets, employees as mockEmployees } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function Assets() {
  const { connected } = useApiStatus();
  const { data: assetsData, isLive } = useSheetData('90_Assets', mockAssets);
  const { data: employeesData } = useSheetData('10_Employees', mockEmployees);

  const getEmpName = (id: string) => {
    if (!id) return 'Unassigned';
    const emp = employeesData.find((e: any) => e.Employee_ID === id);
    return emp ? emp.Full_Name : 'Unassigned';
  };

  const goodCondition = assetsData.filter((a: any) => a.Condition_Status === 'Good').length;
  const totalValue = assetsData.reduce((sum: number, a: any) => sum + (Number(a.Purchase_Cost) || 0), 0);

  const getConditionBadge = (s: string) => {
    if (s === 'Good') return 'bg-green-100 text-green-700';
    if (s === 'Fair') return 'bg-amber-100 text-amber-700';
    if (s === 'Poor') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-LA').format(n);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="text-gray-500 text-sm mt-1">90_Assets • {assetsData.length} assets</p>
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
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><Briefcase size={20} className="text-indigo-600" /></div>
          <div><p className="text-2xl font-bold">{assetsData.length}</p><p className="text-xs text-gray-500">Total Assets</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle size={20} className="text-green-600" /></div>
          <div><p className="text-2xl font-bold">{goodCondition}</p><p className="text-xs text-gray-500">Good Condition</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><AlertTriangle size={20} className="text-amber-600" /></div>
          <div><p className="text-2xl font-bold">₭{(totalValue / 1000000).toFixed(1)}M</p><p className="text-xs text-gray-500">Total Value</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Asset Tag</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Asset Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Brand/Model</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Assigned To</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Cost</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Condition</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {assetsData.map((a: any) => (
                <tr key={a.Asset_ID} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-gray-900">{a.Asset_Tag}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.Asset_Name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.Asset_Category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.Brand} {a.Model}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{getEmpName(a.Assigned_To_Employee_ID)}</td>
                  <td className="px-4 py-3 text-sm text-right font-mono">₭{fmt(Number(a.Purchase_Cost) || 0)}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getConditionBadge(a.Condition_Status)}`}>{a.Condition_Status}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{a.Warranty_Expiry_Date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
