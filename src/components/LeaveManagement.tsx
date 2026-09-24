import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, CalendarDays, Plus, X, Wifi, WifiOff } from 'lucide-react';
import { leaveRequests as mockRequests, leaveBalances as mockBalances, employees as mockEmployees } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function LeaveManagement() {
  const { connected } = useApiStatus();
  const { data: leaveRequests, isLive } = useSheetData('41_Leave_Requests', mockRequests);
  const { data: leaveBalances } = useSheetData('40_Leave_Balance', mockBalances);
  const { data: employeesData } = useSheetData('10_Employees', mockEmployees);

  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const getEmployeeName = (employeeId: string) => {
    const emp = employeesData.find((e: any) => e.Employee_ID === employeeId);
    return emp ? emp.Full_Name : 'Unknown';
  };

  const filteredRequests = leaveRequests.filter((req: any) => {
    const empName = getEmployeeName(req.Employee_ID).toLowerCase();
    const matchesSearch = empName.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.Approval_Status === statusFilter;
    const matchesType = typeFilter === 'All' || req.Leave_Type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const summary = {
    pending: leaveRequests.filter((r: any) => r.Approval_Status === 'Pending').length,
    approved: leaveRequests.filter((r: any) => r.Approval_Status === 'Approved').length,
    rejected: leaveRequests.filter((r: any) => r.Approval_Status === 'Rejected').length,
    total: leaveRequests.length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-700';
      case 'Sick Leave': return 'bg-red-100 text-red-700';
      case 'Personal Leave': return 'bg-purple-100 text-purple-700';
      case 'Maternity Leave': return 'bg-pink-100 text-pink-700';
      case 'Paternity Leave': return 'bg-indigo-100 text-indigo-700';
      case 'Unpaid Leave': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-500 text-sm mt-1">40_Leave_Balance / 41_Leave_Requests • {leaveRequests.length} requests</p>
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
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            New Request
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{summary.pending}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{summary.approved}</p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{summary.rejected}</p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <CalendarDays size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
              <p className="text-xs text-gray-500">Total Requests</p>
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
              placeholder="Search by employee name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
          >
            <option value="All">All Types</option>
            <option value="Annual Leave">Annual</option>
            <option value="Sick Leave">Sick</option>
            <option value="Personal Leave">Personal</option>
            <option value="Maternity Leave">Maternity</option>
            <option value="Paternity Leave">Paternity</option>
            <option value="Unpaid Leave">Unpaid</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredRequests.map((request: any) => (
          <div key={request.Leave_Request_ID} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold text-sm flex-shrink-0">
                  {getEmployeeName(request.Employee_ID).split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{getEmployeeName(request.Employee_ID)}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${getLeaveTypeColor(request.Leave_Type)}`}>
                      {request.Leave_Type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {request.Start_Date} → {request.End_Date}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">{request.Total_Days} day(s)</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Reason: {request.Reason}</p>
                  {request.Approved_Date && (
                    <p className="text-xs text-gray-400 mt-1">Approved: {request.Approved_Date}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-shrink-0">
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getStatusBadge(request.Approval_Status)}`}>
                  {request.Approval_Status}
                </span>
                {request.Approval_Status === 'Pending' && (
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200 transition-colors">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance Overview (40_Leave_Balance)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Annual</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Sick</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Personal</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Used</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leaveBalances.map((item: any) => {
                const emp = employeesData.find((e: any) => e.Employee_ID === item.Employee_ID);
                const used = item.Used_Annual_Leave + item.Used_Sick_Leave + item.Used_Personal_Leave;
                return (
                  <tr key={item.Balance_ID} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{emp?.Full_Name || item.Employee_ID}</td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">{item.Annual_Leave_Entitlement} days</td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">{item.Sick_Leave_Entitlement} days</td>
                    <td className="px-4 py-3 text-sm text-center text-gray-600">{item.Personal_Leave_Entitlement} days</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className="font-medium text-red-600">{used} days</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className="font-bold text-indigo-600">{item.Remaining_Leave} days</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowRequestModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">New Leave Request</h2>
              <button onClick={() => setShowRequestModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
                  <option value="">Select employee...</option>
                  {employeesData.map((emp: any) => (
                    <option key={emp.Employee_ID} value={emp.Employee_ID}>{emp.Full_Name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none">
                  <option value="">Select type...</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Paternity Leave">Paternity Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea rows={3} placeholder="Enter reason for leave..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setShowRequestModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
