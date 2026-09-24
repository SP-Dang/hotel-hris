import { useState } from 'react';
import { Search, DollarSign, TrendingUp, Download, Eye, CheckCircle, Clock, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { payrollRecords as mockPayroll, employees as mockEmployees } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function Payroll() {
  const { connected } = useApiStatus();
  const { data: payrollRecords, isLive } = useSheetData('50_Payroll_Monthly', mockPayroll);
  const { data: employeesData } = useSheetData('10_Employees', mockEmployees);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');

  const getEmployeeName = (employeeId: string) => {
    const emp = employeesData.find((e: any) => e.Employee_ID === employeeId);
    return emp ? emp.Full_Name : employeeId;
  };

  const filteredRecords = payrollRecords.filter((record: any) => {
    const empName = getEmployeeName(record.Employee_ID).toLowerCase();
    const matchesSearch = empName.includes(searchTerm.toLowerCase()) || record.Employee_ID.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.Payroll_Status === statusFilter;
    const matchesMonth = monthFilter === 'All' || `${record.Payroll_Month}/${record.Payroll_Year}` === monthFilter;
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const totalBasic = payrollRecords.reduce((sum: number, r: any) => sum + (Number(r.Basic_Salary) || 0), 0);
  const totalOvertime = payrollRecords.reduce((sum: number, r: any) => sum + (Number(r.Overtime_Pay) || 0), 0);
  const totalBonus = payrollRecords.reduce((sum: number, r: any) => sum + (Number(r.Bonus) || 0), 0);
  const totalNet = payrollRecords.reduce((sum: number, r: any) => sum + (Number(r.Net_Pay) || 0), 0);
  const totalDeductions = payrollRecords.reduce((sum: number, r: any) => sum + (Number(r.Total_Deductions) || 0), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'Processed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LA').format(amount) + ' LAK';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
          <p className="text-gray-500 text-sm mt-1">50_Payroll_Monthly • {payrollRecords.length} records</p>
        </div>
        <div className="flex items-center gap-2">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={16} />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            <DollarSign size={16} />
            Process Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Basic</p>
              <p className="text-sm font-bold text-gray-900">{(totalBasic / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Overtime + Bonus</p>
              <p className="text-sm font-bold text-gray-900">{((totalOvertime + totalBonus) / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Deductions</p>
              <p className="text-sm font-bold text-gray-900">{(totalDeductions / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Net Pay</p>
              <p className="text-sm font-bold text-gray-900">{(totalNet / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-sm font-bold text-gray-900">{payrollRecords.filter((r: any) => r.Payroll_Status === 'Pending').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
          >
            <option value="All">All Months</option>
            <option value="1/2026">January 2026</option>
            <option value="2/2026">February 2026</option>
            <option value="3/2026">March 2026</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processed">Processed</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Basic Salary</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Overtime</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bonus</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross Pay</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Net Pay</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRecords.map((record: any) => (
                <tr key={record.Payroll_ID} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{getEmployeeName(record.Employee_ID)}</p>
                      <p className="text-xs text-gray-500 font-mono">{record.Employee_ID} • {record.Payroll_Month}/{record.Payroll_Year}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-right font-mono">{formatCurrency(Number(record.Basic_Salary) || 0)}</td>
                  <td className="px-6 py-4 text-sm text-green-600 text-right font-mono">{Number(record.Overtime_Pay) > 0 ? formatCurrency(Number(record.Overtime_Pay)) : '-'}</td>
                  <td className="px-6 py-4 text-sm text-green-600 text-right font-mono">{Number(record.Bonus) > 0 ? formatCurrency(Number(record.Bonus)) : '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right font-mono font-medium">{formatCurrency(Number(record.Gross_Pay) || 0)}</td>
                  <td className="px-6 py-4 text-sm text-red-600 text-right font-mono">-{formatCurrency(Number(record.Total_Deductions) || 0)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right font-mono">{formatCurrency(Number(record.Net_Pay) || 0)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBadge(record.Payroll_Status)}`}>
                      {record.Payroll_Status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">Total</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right font-mono">{formatCurrency(totalBasic)}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-700 text-right font-mono">{formatCurrency(totalOvertime)}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-700 text-right font-mono">{formatCurrency(totalBonus)}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right font-mono">{formatCurrency(payrollRecords.reduce((s: number, r: any) => s + (Number(r.Gross_Pay) || 0), 0))}</td>
                <td className="px-6 py-4 text-sm font-bold text-red-700 text-right font-mono">-{formatCurrency(totalDeductions)}</td>
                <td className="px-6 py-4 text-sm font-bold text-indigo-700 text-right font-mono">{formatCurrency(totalNet)}</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="text-sm font-semibold text-indigo-900 mb-2">💡 Payroll Information</h3>
        <ul className="text-xs text-indigo-700 space-y-1">
          <li>• Payment method: Bank transfer (BCEL, LDB, JDB)</li>
          <li>• Payroll period: Monthly (last working day)</li>
          <li>• Currency: LAK (Lao Kip)</li>
        </ul>
      </div>
    </div>
  );
}
