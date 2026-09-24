import { Building2, Users, DollarSign, User, Wifi, WifiOff } from 'lucide-react';
import { departments as mockDepartments, employees as mockEmployees } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';

export default function Departments() {
  const { connected } = useApiStatus();
  const { data: departmentsData, isLive } = useSheetData('02_Departments', mockDepartments);
  const { data: employeesData } = useSheetData('10_Employees', mockEmployees);

  const getDeptEmployees = (deptId: string) => employeesData.filter((e: any) => e.Department_ID === deptId);
  const getManager = (empId: string) => {
    const emp = employeesData.find((e: any) => e.Employee_ID === empId);
    return emp ? emp.Full_Name : 'Not Assigned';
  };

  const totalEmployees = employeesData.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-500 text-sm mt-1">02_Departments • {departmentsData.length} departments</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Building2 size={24} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{departmentsData.length}</p>
              <p className="text-sm text-gray-500">Total Departments</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
              <p className="text-sm text-gray-500">Total Staff</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <User size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{departmentsData.filter((d: any) => d.Active_Status === 'Active').length}</p>
              <p className="text-sm text-gray-500">Active Depts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departmentsData.map((dept: any) => {
          const deptEmps = getDeptEmployees(dept.Department_ID);
          return (
            <div key={dept.Department_ID} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{dept.Department_Name}</h3>
                  <p className="text-xs text-gray-500 font-mono">{dept.Department_Code} • {dept.Department_ID}</p>
                </div>
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Building2 size={20} className="text-indigo-600" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} className="text-gray-400" />
                  <span className="text-gray-500">Manager:</span>
                  <span className="font-medium text-gray-900">{getManager(dept.Manager_Employee_ID)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users size={14} className="text-gray-400" />
                  <span className="text-gray-500">Staff:</span>
                  <span className="font-medium text-gray-900">{deptEmps.length} employees</span>
                </div>
                {dept.Description && (
                  <p className="text-xs text-gray-500">{dept.Description}</p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Staff allocation</span>
                  <span>{Math.round((deptEmps.length / Math.max(totalEmployees, 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${(deptEmps.length / Math.max(totalEmployees, 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
