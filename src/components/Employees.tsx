import { useState } from 'react';
import { Search, Plus, Eye, Edit2, Download, X, Wifi, WifiOff } from 'lucide-react';
import { employees as mockEmployees, departments as mockDepartments } from '../data/mockData';
import { useSheetData, useApiStatus } from '../hooks/useSheetData';
import { GoogleSheetsAPI } from '../services/googleSheetsApi';

export default function Employees() {
  const { connected } = useApiStatus();
  const {  employeesData, isLive, loading } = useSheetData('10_Employees', mockEmployees);
  const { data: departmentsData } = useSheetData('02_Departments', mockDepartments);

  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Safety check - use empty array if data is undefined
  const safeEmployeesData = employeesData || [];
  const safeDepartmentsData = departmentsData || [];
  const [newEmployee, setNewEmployee] = useState<any>({
    Title: 'Mr',
    First_Name: '',
    Last_Name: '',
    Gender: 'Male',
    Date_of_Birth: '',
    Nationality: 'Lao',
    Marital_Status: 'Single',
    Phone: '',
    Email: '',
    Emergency_Contact_Name: '',
    Emergency_Contact_Phone: '',
    Province: '',
    District: '',
    City: '',
    Address: '',
    Department_ID: '',
    Position_ID: '',
    Supervisor_Employee_ID: '',
    Employment_Type: 'Full-Time',
    Employment_Status: 'Active',
    Join_Date: new Date().toISOString().split('T')[0],
    Probation_End_Date: '',
    Confirmation_Date: '',
    Resignation_Date: '',
    Basic_Salary: 0,
    Bank_Name: '',
    Bank_Account_Name: '',
    Bank_Account_No: '',
    Tax_No: '',
    Social_Security_No: '',
    Photo_URL: '',
    Remarks: '',
  });

  const filtered = safeEmployeesData.filter((e: any) => {
    const name = `${e.Full_Name || ''} ${e.Employee_Code || ''} ${e.Email || ''}`.toLowerCase();
    const matchSearch = name.includes(searchTerm.toLowerCase());
    const matchDept = deptFilter === 'All' || e.Department_ID === deptFilter;
    const matchStatus = statusFilter === 'All' || e.Employment_Status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const getStatusBadge = (s: string) => {
    if (s === 'Active') return 'bg-green-100 text-green-700';
    if (s === 'On Probation') return 'bg-amber-100 text-amber-700';
    if (s === 'Resigned') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-LA').format(n);

  const resetForm = () => {
    setNewEmployee({
      Title: 'Mr', First_Name: '', Last_Name: '', Gender: 'Male', Date_of_Birth: '',
      Nationality: 'Lao', Marital_Status: 'Single', Phone: '', Email: '',
      Emergency_Contact_Name: '', Emergency_Contact_Phone: '', Province: '', District: '',
      City: '', Address: '', Department_ID: '', Position_ID: '', Supervisor_Employee_ID: '',
      Employment_Type: 'Full-Time', Employment_Status: 'Active',
      Join_Date: new Date().toISOString().split('T')[0], Probation_End_Date: '',
      Confirmation_Date: '', Resignation_Date: '', Basic_Salary: 0, Bank_Name: '',
      Bank_Account_Name: '', Bank_Account_No: '', Tax_No: '', Social_Security_No: '',
      Photo_URL: '', Remarks: '',
    });
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.First_Name || !newEmployee.Last_Name || !newEmployee.Email || !newEmployee.Department_ID) {
      alert('Please fill in all required fields (First Name, Last Name, Email, Department)');
      return;
    }
    try {
      const timestamp = Date.now();
      const dept = safeDepartmentsData.find((d: any) => d.Department_ID === newEmployee.Department_ID);
      const employeeData = {
        ...newEmployee,
        Employee_ID: `EMP${timestamp}`,
        Employee_Code: `${dept?.Department_Code || 'EMP'}-${timestamp.toString().slice(-4)}`,
        Full_Name: `${newEmployee.First_Name} ${newEmployee.Last_Name}`,
        Department_Name: dept?.Department_Name || '',
        Position_Name: newEmployee.Position_ID || '',
      };
      await GoogleSheetsAPI.addEmployee(employeeData);
      alert('Employee added successfully!');
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      alert('Failed to add employee: ' + (error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-500 text-sm mt-1">10_Employees tab • {safeEmployeesData.length} records</p>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"><Download size={16} />Export</button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"><Plus size={16} />Add Employee</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search name, code, email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none" />
          </div>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white outline-none">
            <option value="All">All Departments</option>
            {safeDepartmentsData.map((d: any) => <option key={d.Department_ID} value={d.Department_ID}>{d.Department_Name}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white outline-none">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="On Probation">On Probation</option>
            <option value="Resigned">Resigned</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500">Showing {filtered.length} of {safeEmployeesData.length} employees</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Code</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Position</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Salary</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((emp: any, i: number) => (
                <tr key={emp.Employee_ID || i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold text-xs">{(emp.First_Name || '?')[0]}{(emp.Last_Name || '?')[0]}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{emp.Full_Name || `${emp.First_Name} ${emp.Last_Name}`}</p>
                        <p className="text-xs text-gray-500">{emp.Email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{emp.Employee_Code}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.Department_Name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.Position_Name}</td>
                  <td className="px-4 py-3"><span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded">{emp.Employment_Type}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadge(emp.Employment_Status)}`}>{emp.Employment_Status}</span></td>
                  <td className="px-4 py-3 text-sm text-right font-mono">₭{fmt(Number(emp.Basic_Salary) || 0)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(emp)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Eye size={16} /></button>
                      <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Employee Details</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">{(selected.First_Name || '?')[0]}{(selected.Last_Name || '?')[0]}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selected.Title} {selected.Full_Name || `${selected.First_Name} ${selected.Last_Name}`}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{selected.Position_Name} • {selected.Department_Name}</p>
                  <p className="text-xs text-gray-500 mt-1">{selected.Employee_Code} | {selected.Employee_ID}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  ['Gender', selected.Gender], ['Date of Birth', selected.Date_of_Birth], ['Nationality', selected.Nationality],
                  ['Marital Status', selected.Marital_Status], ['Phone', selected.Phone], ['Email', selected.Email],
                  ['Province', selected.Province], ['District', selected.District], ['Address', selected.Address],
                  ['Employment Type', selected.Employment_Type], ['Join Date', selected.Join_Date],
                  ['Probation End', selected.Probation_End_Date], ['Probation Status', selected.Probation_Status],
                  ['Basic Salary', selected.Basic_Salary ? `₭${fmt(Number(selected.Basic_Salary))}` : ''],
                  ['Bank', `${selected.Bank_Name || ''} - ${selected.Bank_Account_No || ''}`],
                  ['Tax No', selected.Tax_No], ['Social Security', selected.Social_Security_No],
                  ['Emergency Contact', `${selected.Emergency_Contact_Name || ''} (${selected.Emergency_Contact_Phone || ''})`],
                ].filter(([_, v]) => v).map(([label, value], i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">{label}</p>
                    <p className="text-sm text-gray-900 font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Add New Employee</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <select value={newEmployee.Title} onChange={e => setNewEmployee({...newEmployee, Title: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none">
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input type="text" value={newEmployee.First_Name} onChange={e => setNewEmployee({...newEmployee, First_Name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input type="text" value={newEmployee.Last_Name} onChange={e => setNewEmployee({...newEmployee, Last_Name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select value={newEmployee.Gender} onChange={e => setNewEmployee({...newEmployee, Gender: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" value={newEmployee.Date_of_Birth} onChange={e => setNewEmployee({...newEmployee, Date_of_Birth: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <input type="text" value={newEmployee.Nationality} onChange={e => setNewEmployee({...newEmployee, Nationality: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                    <select value={newEmployee.Marital_Status} onChange={e => setNewEmployee({...newEmployee, Marital_Status: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none">
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" value={newEmployee.Email} onChange={e => setNewEmployee({...newEmployee, Email: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" value={newEmployee.Phone} onChange={e => setNewEmployee({...newEmployee, Phone: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="+856 20 XXXX XXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
                    <input type="text" value={newEmployee.Emergency_Contact_Name} onChange={e => setNewEmployee({...newEmployee, Emergency_Contact_Name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
                    <input type="tel" value={newEmployee.Emergency_Contact_Phone} onChange={e => setNewEmployee({...newEmployee, Emergency_Contact_Phone: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                    <input type="text" value={newEmployee.Province} onChange={e => setNewEmployee({...newEmployee, Province: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input type="text" value={newEmployee.District} onChange={e => setNewEmployee({...newEmployee, District: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" value={newEmployee.City} onChange={e => setNewEmployee({...newEmployee, City: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" value={newEmployee.Address} onChange={e => setNewEmployee({...newEmployee, Address: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Employment Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <select value={newEmployee.Department_ID} onChange={e => setNewEmployee({...newEmployee, Department_ID: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white" required>
                      <option value="">Select Department</option>
                      {safeDepartmentsData.map((d: any) => <option key={d.Department_ID} value={d.Department_ID}>{d.Department_Name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position ID</label>
                    <input type="text" value={newEmployee.Position_ID} onChange={e => setNewEmployee({...newEmployee, Position_ID: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor Employee ID</label>
                    <input type="text" value={newEmployee.Supervisor_Employee_ID} onChange={e => setNewEmployee({...newEmployee, Supervisor_Employee_ID: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    <select value={newEmployee.Employment_Type} onChange={e => setNewEmployee({...newEmployee, Employment_Type: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white">
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select value={newEmployee.Employment_Status} onChange={e => setNewEmployee({...newEmployee, Employment_Status: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white">
                      <option value="Active">Active</option>
                      <option value="On Probation">On Probation</option>
                      <option value="Resigned">Resigned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Join Date *</label>
                    <input type="date" value={newEmployee.Join_Date} onChange={e => setNewEmployee({...newEmployee, Join_Date: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Probation End Date</label>
                    <input type="date" value={newEmployee.Probation_End_Date} onChange={e => setNewEmployee({...newEmployee, Probation_End_Date: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Date</label>
                    <input type="date" value={newEmployee.Confirmation_Date} onChange={e => setNewEmployee({...newEmployee, Confirmation_Date: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resignation Date</label>
                    <input type="date" value={newEmployee.Resignation_Date} onChange={e => setNewEmployee({...newEmployee, Resignation_Date: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                </div>
              </div>

              {/* Compensation & Banking */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Compensation & Banking</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary (₭)</label>
                    <input type="number" value={newEmployee.Basic_Salary} onChange={e => setNewEmployee({...newEmployee, Basic_Salary: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input type="text" value={newEmployee.Bank_Name} onChange={e => setNewEmployee({...newEmployee, Bank_Name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. BCEL, LDB" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Name</label>
                    <input type="text" value={newEmployee.Bank_Account_Name} onChange={e => setNewEmployee({...newEmployee, Bank_Account_Name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account No</label>
                    <input type="text" value={newEmployee.Bank_Account_No} onChange={e => setNewEmployee({...newEmployee, Bank_Account_No: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                </div>
              </div>

              {/* Tax & Social Security */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Tax & Social Security</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax No</label>
                    <input type="text" value={newEmployee.Tax_No} onChange={e => setNewEmployee({...newEmployee, Tax_No: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Social Security No</label>
                    <input type="text" value={newEmployee.Social_Security_No} onChange={e => setNewEmployee({...newEmployee, Social_Security_No: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                </div>
              </div>

              {/* Additional */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Additional Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                    <input type="text" value={newEmployee.Photo_URL} onChange={e => setNewEmployee({...newEmployee, Photo_URL: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                    <textarea value={newEmployee.Remarks} onChange={e => setNewEmployee({...newEmployee, Remarks: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none resize-none" />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={handleAddEmployee} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Add Employee</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
