import { Users, CalendarDays, DollarSign, FileText, Briefcase, GraduationCap, Shield, Wifi, WifiOff } from 'lucide-react';
import { employees as mockEmployees, departments as mockDepartments, leaveRequests as mockLeaveRequests, payrollRecords as mockPayroll, documents as mockDocuments, jobOpenings as mockJobOpenings, trainingRecords, assets as mockAssets, holidays as mockHolidays } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function Dashboard() {
  const { connected } = useApiStatus();
  
  const { data: employeesData, isLive: empLive } = useSheetData('10_Employees', mockEmployees);
  const { data: departmentsData, isLive: deptLive } = useSheetData('02_Departments', mockDepartments);
  const { data: leaveData, isLive: leaveLive } = useSheetData('41_Leave_Requests', mockLeaveRequests);
  const { data: payrollData, isLive: payrollLive } = useSheetData('50_Payroll_Monthly', mockPayroll);
  const { data: documentsData, isLive: docLive } = useSheetData('20_Employee_Documents', mockDocuments);
  const { data: assetsData, isLive: assetLive } = useSheetData('90_Assets', mockAssets);
  const { data: holidaysData, isLive: holidayLive } = useSheetData('04_Holidays', mockHolidays);
  const { data: jobData, isLive: jobLive } = useSheetData('80_Job_Openings', mockJobOpenings);
  
  const isLive = empLive || deptLive || leaveLive || payrollLive;
  const fmt = (n: number) => new Intl.NumberFormat('en-LA').format(n);

  // Calculate stats from whatever data we have (live or mock)
  const activeEmployees = employeesData.filter((e: any) => e.Employment_Status === 'Active').length;
  const onProbation = employeesData.filter((e: any) => e.Employment_Status === 'On Probation').length;
  const femaleEmployees = employeesData.filter((e: any) => e.Gender === 'Female').length;
  const maleEmployees = employeesData.filter((e: any) => e.Gender === 'Male').length;
  const pendingLeaves = leaveData.filter((l: any) => l.Approval_Status === 'Pending').length;
  const approvedLeaves = leaveData.filter((l: any) => l.Approval_Status === 'Approved').length;
  const sickLeaves = leaveData.filter((l: any) => l.Leave_Type === 'Sick Leave').length;
  const totalPayroll = payrollData.reduce((sum: number, p: any) => sum + (Number(p.Net_Pay) || 0), 0);
  const avgPayroll = payrollData.length > 0 ? totalPayroll / payrollData.length : 0;
  const totalDeductions = payrollData.reduce((sum: number, p: any) => sum + (Number(p.Total_Deductions) || 0), 0);
  const grossPay = payrollData.reduce((sum: number, p: any) => sum + (Number(p.Gross_Pay) || 0), 0);
  const expiringDocs = documentsData.filter((d: any) => d.Status === 'Expiring Soon').length;
  const assignedAssets = assetsData.length;

  return (
    <div className="space-y-6">
      {/* Header with connection status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR & Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Executive overview for August 2026</p>
        </div>
        <div className="flex items-center gap-3">
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
          <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border">
            📅 Last Updated: 23/09/2026
          </div>
        </div>
      </div>

      {/* Workforce Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Users size={20} className="text-blue-600" /></div>
            <h3 className="text-sm font-semibold text-gray-700">WORKFORCE OVERVIEW</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-sm text-gray-500">Employees</span><span className="text-sm font-bold">{employeesData.length}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Active Employees</span><span className="text-sm font-bold text-green-600">{activeEmployees}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">On Probation</span><span className="text-sm font-bold text-amber-600">{onProbation}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Female / Male</span><span className="text-sm font-bold">{femaleEmployees} / {maleEmployees}</span></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><CalendarDays size={20} className="text-amber-600" /></div>
            <h3 className="text-sm font-semibold text-gray-700">LEAVE & ATTENDANCE</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-sm text-gray-500">Pending Leave Requests</span><span className="text-sm font-bold text-amber-600">{pendingLeaves}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Approved This Month</span><span className="text-sm font-bold text-green-600">{approvedLeaves}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Sick Leave Requests</span><span className="text-sm font-bold text-red-600">{sickLeaves}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Total Requests</span><span className="text-sm font-bold">{leaveData.length}</span></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><DollarSign size={20} className="text-green-600" /></div>
            <h3 className="text-sm font-semibold text-gray-700">PAYROLL & FINANCE</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-sm text-gray-500">Total Payroll (Net)</span><span className="text-sm font-bold">₭{fmt(totalPayroll)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Average Net Pay</span><span className="text-sm font-bold">₭{fmt(Math.round(avgPayroll))}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Total Deductions</span><span className="text-sm font-bold text-red-600">₭{fmt(totalDeductions)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Gross Pay</span><span className="text-sm font-bold">₭{fmt(grossPay)}</span></div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><FileText size={20} className="text-purple-600" /></div>
          <div><p className="text-2xl font-bold">{expiringDocs}</p><p className="text-xs text-gray-500">Docs Expiring (30 Days)</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"><Briefcase size={20} className="text-indigo-600" /></div>
          <div><p className="text-2xl font-bold">{assignedAssets}</p><p className="text-xs text-gray-500">Assigned Assets</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center"><GraduationCap size={20} className="text-teal-600" /></div>
          <div><p className="text-2xl font-bold">{trainingRecords.filter((t: any) => t.Completion_Status === 'In Progress').length}</p><p className="text-xs text-gray-500">Ongoing Training</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center"><Shield size={20} className="text-rose-600" /></div>
          <div><p className="text-2xl font-bold">{jobData.filter((j: any) => j.Job_Status === 'Open').length}</p><p className="text-xs text-gray-500">Open Job Postings</p></div>
        </div>
      </div>

      {/* Department Workforce & Payroll */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Department Workforce & Payroll Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Headcount</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Active</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Probation</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Total Salary</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Avg Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {departmentsData.map((dept: any) => {
                const deptEmps = employeesData.filter((e: any) => e.Department_ID === dept.Department_ID);
                const active = deptEmps.filter((e: any) => e.Employment_Status === 'Active').length;
                const probation = deptEmps.filter((e: any) => e.Employment_Status === 'On Probation').length;
                const totalSalary = deptEmps.reduce((s: number, e: any) => s + (Number(e.Basic_Salary) || 0), 0);
                const avgSalary = deptEmps.length > 0 ? totalSalary / deptEmps.length : 0;
                return (
                  <tr key={dept.Department_ID} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{dept.Department_Name}</td>
                    <td className="px-4 py-3 text-sm text-center">{deptEmps.length}</td>
                    <td className="px-4 py-3 text-sm text-center text-green-600">{active}</td>
                    <td className="px-4 py-3 text-sm text-center text-amber-600">{probation}</td>
                    <td className="px-4 py-3 text-sm text-right font-mono">₭{fmt(totalSalary)}</td>
                    <td className="px-4 py-3 text-sm text-right font-mono">₭{fmt(Math.round(avgSalary))}</td>
                  </tr>
                );
              })}
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-3 text-sm">Total</td>
                <td className="px-4 py-3 text-sm text-center">{employeesData.length}</td>
                <td className="px-4 py-3 text-sm text-center text-green-600">{activeEmployees}</td>
                <td className="px-4 py-3 text-sm text-center text-amber-600">{onProbation}</td>
                <td className="px-4 py-3 text-sm text-right font-mono">₭{fmt(employeesData.reduce((s: number, e: any) => s + (Number(e.Basic_Salary) || 0), 0))}</td>
                <td className="px-4 py-3 text-sm text-right font-mono">₭{fmt(Math.round(employeesData.reduce((s: number, e: any) => s + (Number(e.Basic_Salary) || 0), 0) / Math.max(employeesData.length, 1)))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Holidays */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🎉 Upcoming Holidays</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {holidaysData.slice(0, 6).map((h: any) => (
            <div key={h.Holiday_ID} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
              <div className="text-center min-w-[40px]">
                <p className="text-xs text-indigo-500 font-medium">{new Date(h.Holiday_Date).toLocaleDateString('en', { month: 'short' })}</p>
                <p className="text-lg font-bold text-indigo-700">{new Date(h.Holiday_Date).getDate()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{h.Holiday_Name}</p>
                <p className="text-xs text-gray-500">{h.Holiday_Type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
