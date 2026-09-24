import { useState } from 'react';
import { Search, Calendar, Filter, CheckCircle, XCircle, AlertCircle, Clock, Wifi, WifiOff } from 'lucide-react';
import { attendanceRecords as mockAttendance, attendanceSummaries as mockSummaries, employees as mockEmployees } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function Attendance() {
  const { connected } = useApiStatus();
  const { data: attendanceData, isLive } = useSheetData('30_Attendance_Log', mockAttendance);
  const { data: summaryData } = useSheetData('33_Attendance_Summary', mockSummaries);
  const { data: employeesData } = useSheetData('10_Employees', mockEmployees);

  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [view, setView] = useState<'daily' | 'summary'>('daily');

  const getEmployeeName = (employeeId: string) => {
    const emp = employeesData.find((e: any) => e.Employee_ID === employeeId);
    return emp ? emp.Full_Name : 'Unknown';
  };

  const getEmployeeDept = (employeeId: string) => {
    const emp = employeesData.find((e: any) => e.Employee_ID === employeeId);
    return emp ? emp.Department_Name : 'Unknown';
  };

  const filteredRecords = attendanceData.filter((record: any) => {
    const empName = getEmployeeName(record.Employee_ID).toLowerCase();
    const matchesSearch = empName.includes(searchTerm.toLowerCase()) || record.Employee_ID.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.Attendance_Status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle size={16} className="text-green-500" />;
      case 'Late': return <AlertCircle size={16} className="text-amber-500" />;
      case 'Absent': return <XCircle size={16} className="text-red-500" />;
      case 'Leave': return <Calendar size={16} className="text-blue-500" />;
      case 'Half Day': return <Clock size={16} className="text-purple-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-700';
      case 'Late': return 'bg-amber-100 text-amber-700';
      case 'Absent': return 'bg-red-100 text-red-700';
      case 'Leave': return 'bg-blue-100 text-blue-700';
      case 'Half Day': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const summary = {
    present: attendanceData.filter((r: any) => r.Attendance_Status === 'Present').length,
    late: attendanceData.filter((r: any) => r.Attendance_Status === 'Late').length,
    absent: attendanceData.filter((r: any) => r.Attendance_Status === 'Absent').length,
    leave: attendanceData.filter((r: any) => r.Attendance_Status === 'Leave').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-500 text-sm mt-1">30_Attendance_Log / 33_Attendance_Summary • {attendanceData.length} records</p>
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
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button onClick={() => setView('daily')} className={`px-3 py-1.5 text-xs font-medium rounded-md ${view === 'daily' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>Daily Log</button>
            <button onClick={() => setView('summary')} className={`px-3 py-1.5 text-xs font-medium rounded-md ${view === 'summary' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>Monthly Summary</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{summary.present}</p>
              <p className="text-xs text-gray-500">Present</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{summary.late}</p>
              <p className="text-xs text-gray-500">Late</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{summary.absent}</p>
              <p className="text-xs text-gray-500">Absent</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{summary.leave}</p>
              <p className="text-xs text-gray-500">On Leave</p>
            </div>
          </div>
        </div>
      </div>

      {view === 'daily' ? (
        <>
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hours</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">OT (min)</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredRecords.map((record: any) => {
                    const hours = record.Check_In_Time && record.Check_Out_Time
                      ? calculateHours(record.Check_In_Time, record.Check_Out_Time)
                      : '-';
                    return (
                      <tr key={record.Attendance_ID} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(record.Attendance_Status)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{getEmployeeName(record.Employee_ID)}</p>
                              <p className="text-xs text-gray-500 font-mono">{record.Employee_ID}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{getEmployeeDept(record.Employee_ID)}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">{record.Check_In_Time || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">{record.Check_Out_Time || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{hours}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{record.Overtime_Minutes > 0 ? `${record.Overtime_Minutes} min` : '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadge(record.Attendance_Status)}`}>
                            {record.Attendance_Status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-[150px] truncate">{record.Notes || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Present</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Late</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Absent</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Leave</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {summaryData.map((record: any) => (
                  <tr key={record.Summary_ID} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.Employee_Name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.Department_Name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.Attendance_Month}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{record.Scheduled_Workdays}</td>
                    <td className="px-6 py-4 text-sm text-center text-green-600 font-medium">{record.Present_Days}</td>
                    <td className="px-6 py-4 text-sm text-center text-amber-600 font-medium">{record.Late_Days}</td>
                    <td className="px-6 py-4 text-sm text-center text-red-600 font-medium">{record.Absent_Days}</td>
                    <td className="px-6 py-4 text-sm text-center text-blue-600 font-medium">{record.Approved_Leave_Days}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span className={`font-bold ${record.Attendance_Rate >= 95 ? 'text-green-600' : record.Attendance_Rate >= 85 ? 'text-amber-600' : 'text-red-600'}`}>
                        {record.Attendance_Rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function calculateHours(checkIn: string, checkOut: string): string {
  const [inH, inM] = checkIn.split(':').map(Number);
  const [outH, outM] = checkOut.split(':').map(Number);
  let totalMinutes = (outH * 60 + outM) - (inH * 60 + inM);
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}
