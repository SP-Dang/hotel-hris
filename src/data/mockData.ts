import { Employee, Department, Position, AttendanceRecord, AttendanceSummary, LeaveRequest, LeaveBalance, PayrollRecord, JobOpening, Applicant, Document, TrainingRecord, PerformanceReview, Asset, Holiday } from '../types';

export const departments: Department[] = [
  { Department_ID: 'DEPT01', Department_Name: 'Human Resources', Department_Code: 'HR', Manager_Employee_ID: 'EMP001', Parent_Department: '', Description: 'HR & Admin department', Active_Status: 'Active' },
  { Department_ID: 'DEPT02', Department_Name: 'Accounting and Finance', Department_Code: 'FIN', Manager_Employee_ID: 'EMP002', Parent_Department: '', Description: 'Finance and accounting', Active_Status: 'Active' },
  { Department_ID: 'DEPT03', Department_Name: 'Front Office', Department_Code: 'FO', Manager_Employee_ID: 'EMP003', Parent_Department: '', Description: 'Front desk operations', Active_Status: 'Active' },
  { Department_ID: 'DEPT04', Department_Name: 'Housekeeping', Department_Code: 'HK', Manager_Employee_ID: 'EMP004', Parent_Department: '', Description: 'Room cleaning and maintenance', Active_Status: 'Active' },
  { Department_ID: 'DEPT05', Department_Name: 'Food & Beverage', Department_Code: 'FB', Manager_Employee_ID: 'EMP005', Parent_Department: '', Description: 'Restaurant and bar operations', Active_Status: 'Active' },
  { Department_ID: 'DEPT06', Department_Name: 'Kitchen', Department_Code: 'KIT', Manager_Employee_ID: '', Parent_Department: 'DEPT05', Description: 'Food preparation', Active_Status: 'Active' },
  { Department_ID: 'DEPT07', Department_Name: 'Security', Department_Code: 'SEC', Manager_Employee_ID: '', Parent_Department: '', Description: 'Hotel security', Active_Status: 'Active' },
  { Department_ID: 'DEPT08', Department_Name: 'Maintenance', Department_Code: 'MNT', Manager_Employee_ID: '', Parent_Department: '', Description: 'Building maintenance', Active_Status: 'Active' },
];

export const positions: Position[] = [
  { Position_ID: 'POS01', Position_Title: 'HR Manager', Position_Code: 'HR-MGR', Department_ID: 'DEPT01', Grade: 'M2', Level: 'Manager', Reports_To_Position_ID: '', Description: 'Head of HR', Active_Status: 'Active' },
  { Position_ID: 'POS02', Position_Title: 'Finance Manager', Position_Code: 'FIN-MGR', Department_ID: 'DEPT02', Grade: 'M2', Level: 'Manager', Reports_To_Position_ID: '', Description: 'Head of Finance', Active_Status: 'Active' },
  { Position_ID: 'POS03', Position_Title: 'Front Office Manager', Position_Code: 'FO-MGR', Department_ID: 'DEPT03', Grade: 'M2', Level: 'Manager', Reports_To_Position_ID: '', Description: 'Head of Front Office', Active_Status: 'Active' },
  { Position_ID: 'POS04', Position_Title: 'Receptionist', Position_Code: 'FO-REC', Department_ID: 'DEPT03', Grade: 'S1', Level: 'Staff', Reports_To_Position_ID: 'POS03', Description: 'Front desk reception', Active_Status: 'Active' },
  { Position_ID: 'POS05', Position_Title: 'F&B Manager', Position_Code: 'FB-MGR', Department_ID: 'DEPT05', Grade: 'M2', Level: 'Manager', Reports_To_Position_ID: '', Description: 'Head of F&B', Active_Status: 'Active' },
  { Position_ID: 'POS06', Position_Title: 'Housekeeping Supervisor', Position_Code: 'HK-SUP', Department_ID: 'DEPT04', Grade: 'S3', Level: 'Supervisor', Reports_To_Position_ID: '', Description: 'HK team lead', Active_Status: 'Active' },
  { Position_ID: 'POS07', Position_Title: 'Room Attendant', Position_Code: 'HK-RA', Department_ID: 'DEPT04', Grade: 'S1', Level: 'Staff', Reports_To_Position_ID: 'POS06', Description: 'Room cleaning', Active_Status: 'Active' },
  { Position_ID: 'POS08', Position_Title: 'Accountant', Position_Code: 'FIN-ACC', Department_ID: 'DEPT02', Grade: 'S2', Level: 'Staff', Reports_To_Position_ID: 'POS02', Description: 'Accounting staff', Active_Status: 'Active' },
];

export const employees: Employee[] = [
  {
    Employee_ID: 'EMP001', Employee_Code: 'HR-001', Title: 'Mr', First_Name: 'Somchai', Last_Name: 'Vongphachan',
    Full_Name: 'Somchai Vongphachan', Gender: 'Male', Date_of_Birth: '1985-03-15', Nationality: 'Lao',
    Marital_Status: 'Married', Phone: '+856 20 5555 1001', Email: 'somchai.v@hotellaos.com',
    Emergency_Contact_Name: 'Dao Vongphachan', Emergency_Contact_Phone: '+856 20 5555 9001',
    Province: 'Vientiane Capital', District: 'Chanthabouly', City: 'Vientiane', Address: 'Ban Wat Nong',
    Department_ID: 'DEPT01', Position_ID: 'POS01', Supervisor_Employee_ID: '',
    Employment_Type: 'Full-Time', Employment_Status: 'Active', Join_Date: '2018-01-15',
    Probation_End_Date: '2018-04-15', Confirmation_Date: '2018-04-10', Resignation_Date: '',
    Basic_Salary: 8500000, Bank_Name: 'BCEL', Bank_Account_Name: 'Somchai Vongphachan',
    Bank_Account_No: '0123456789', Tax_No: 'TAX001', Social_Security_No: 'SS001',
    Photo_URL: '', Remarks: '', Department_Name: 'Human Resources', Year_of_Service: 7,
    Position_Name: 'HR Manager', Age: 40, Probation_Status: 'Confirmed', Weekly_Off_Days: 'Sunday'
  },
  {
    Employee_ID: 'EMP002', Employee_Code: 'FIN-001', Title: 'Ms', First_Name: 'Souphaphone', Last_Name: 'Vongsa',
    Full_Name: 'Souphaphone Vongsa', Gender: 'Female', Date_of_Birth: '1986-11-25', Nationality: 'Lao',
    Marital_Status: 'Married', Phone: '+856 20 5555 1002', Email: 'souphaphone.v@hotellaos.com',
    Emergency_Contact_Name: 'Thong Vongsa', Emergency_Contact_Phone: '+856 20 5555 9002',
    Province: 'Vientiane Capital', District: 'Chanthabouly', City: 'Vientiane', Address: 'Ban Wat Chan',
    Department_ID: 'DEPT02', Position_ID: 'POS02', Supervisor_Employee_ID: '',
    Employment_Type: 'Full-Time', Employment_Status: 'Active', Join_Date: '2017-02-01',
    Probation_End_Date: '2017-05-01', Confirmation_Date: '2017-04-28', Resignation_Date: '',
    Basic_Salary: 9500000, Bank_Name: 'BCEL', Bank_Account_Name: 'Souphaphone Vongsa',
    Bank_Account_No: '0123456808', Tax_No: 'TAX002', Social_Security_No: 'SS002',
    Photo_URL: '', Remarks: '', Department_Name: 'Accounting and Finance', Year_of_Service: 8,
    Position_Name: 'Finance Manager', Age: 39, Probation_Status: 'Confirmed', Weekly_Off_Days: 'Sunday'
  },
  {
    Employee_ID: 'EMP003', Employee_Code: 'FIN-002', Title: 'Ms', First_Name: 'Manivone', Last_Name: 'Phommavong',
    Full_Name: 'Manivone Phommavong', Gender: 'Female', Date_of_Birth: '1995-07-22', Nationality: 'Lao',
    Marital_Status: 'Single', Phone: '+856 20 5555 1003', Email: 'manivone.p@hotellaos.com',
    Emergency_Contact_Name: 'Boun Phommavong', Emergency_Contact_Phone: '+856 20 5555 9003',
    Province: 'Vientiane Capital', District: 'Sisattanak', City: 'Vientiane', Address: 'Ban Xieng Muan',
    Department_ID: 'DEPT02', Position_ID: 'POS08', Supervisor_Employee_ID: 'EMP002',
    Employment_Type: 'Full-Time', Employment_Status: 'Active', Join_Date: '2022-06-01',
    Probation_End_Date: '2022-09-01', Confirmation_Date: '2022-08-28', Resignation_Date: '',
    Basic_Salary: 4200000, Bank_Name: 'BCEL', Bank_Account_Name: 'Manivone Phommavong',
    Bank_Account_No: '0123456790', Tax_No: 'TAX003', Social_Security_No: 'SS003',
    Photo_URL: '', Remarks: '', Department_Name: 'Accounting and Finance', Year_of_Service: 3,
    Position_Name: 'Accountant', Age: 30, Probation_Status: 'Confirmed', Weekly_Off_Days: 'Sunday'
  },
  {
    Employee_ID: 'EMP004', Employee_Code: 'HR-002', Title: 'Ms', First_Name: 'Noy', Last_Name: 'Dalaloy',
    Full_Name: 'Noy Dalaloy', Gender: 'Female', Date_of_Birth: '1990-01-30', Nationality: 'Lao',
    Marital_Status: 'Single', Phone: '+856 20 5555 1004', Email: 'noy.d@hotellaos.com',
    Emergency_Contact_Name: 'Bounmy Dalaloy', Emergency_Contact_Phone: '+856 20 5555 9004',
    Province: 'Vientiane Capital', District: 'Chanthabouly', City: 'Vientiane', Address: 'Ban Anou',
    Department_ID: 'DEPT01', Position_ID: 'POS01', Supervisor_Employee_ID: 'EMP001',
    Employment_Type: 'Full-Time', Employment_Status: 'On Probation', Join_Date: '2026-07-01',
    Probation_End_Date: '2026-10-01', Confirmation_Date: '', Resignation_Date: '',
    Basic_Salary: 36000000, Bank_Name: 'LDB', Bank_Account_Name: 'Noy Dalaloy',
    Bank_Account_No: '0123456806', Tax_No: 'TAX004', Social_Security_No: 'SS004',
    Photo_URL: '', Remarks: 'New hire', Department_Name: 'Human Resources', Year_of_Service: 0,
    Position_Name: 'HR Officer', Age: 35, Probation_Status: 'On Probation', Weekly_Off_Days: 'Sunday'
  },
];

export const attendanceRecords: AttendanceRecord[] = [
  { Attendance_ID: 'ATT001', Attendance_Date: '2026-08-01', Employee_ID: 'EMP001', Check_In_Time: '07:45', Check_Out_Time: '17:15', Check_In_Method: 'Fingerprint', Check_Out_Method: 'Fingerprint', Late_Minutes: 0, Early_Leave_Minutes: 0, Overtime_Minutes: 0, Work_Hours: 9.5, Attendance_Status: 'Present', Shift_Name: 'Day Shift', Notes: '', Half_Day_Absence_Flag: false },
  { Attendance_ID: 'ATT002', Attendance_Date: '2026-08-01', Employee_ID: 'EMP002', Check_In_Time: '08:10', Check_Out_Time: '17:00', Check_In_Method: 'Fingerprint', Check_Out_Method: 'Fingerprint', Late_Minutes: 10, Early_Leave_Minutes: 0, Overtime_Minutes: 0, Work_Hours: 8.83, Attendance_Status: 'Late', Shift_Name: 'Day Shift', Notes: 'Traffic', Half_Day_Absence_Flag: false },
  { Attendance_ID: 'ATT003', Attendance_Date: '2026-08-01', Employee_ID: 'EMP003', Check_In_Time: '07:55', Check_Out_Time: '17:05', Check_In_Method: 'Fingerprint', Check_Out_Method: 'Fingerprint', Late_Minutes: 0, Early_Leave_Minutes: 0, Overtime_Minutes: 0, Work_Hours: 9.17, Attendance_Status: 'Present', Shift_Name: 'Day Shift', Notes: '', Half_Day_Absence_Flag: false },
  { Attendance_ID: 'ATT004', Attendance_Date: '2026-08-01', Employee_ID: 'EMP004', Check_In_Time: '08:00', Check_Out_Time: '17:00', Check_In_Method: 'Fingerprint', Check_Out_Method: 'Fingerprint', Late_Minutes: 0, Early_Leave_Minutes: 0, Overtime_Minutes: 0, Work_Hours: 9, Attendance_Status: 'Present', Shift_Name: 'Day Shift', Notes: '', Half_Day_Absence_Flag: false },
  { Attendance_ID: 'ATT005', Attendance_Date: '2026-08-02', Employee_ID: 'EMP001', Check_In_Time: '07:50', Check_Out_Time: '17:00', Check_In_Method: 'Fingerprint', Check_Out_Method: 'Fingerprint', Late_Minutes: 0, Early_Leave_Minutes: 0, Overtime_Minutes: 0, Work_Hours: 9.17, Attendance_Status: 'Present', Shift_Name: 'Day Shift', Notes: '', Half_Day_Absence_Flag: false },
  { Attendance_ID: 'ATT006', Attendance_Date: '2026-08-02', Employee_ID: 'EMP002', Check_In_Time: '08:00', Check_Out_Time: '17:30', Check_In_Method: 'Fingerprint', Check_Out_Method: 'Fingerprint', Late_Minutes: 0, Early_Leave_Minutes: 0, Overtime_Minutes: 30, Work_Hours: 9.5, Attendance_Status: 'Present', Shift_Name: 'Day Shift', Notes: '', Half_Day_Absence_Flag: false },
  { Attendance_ID: 'ATT007', Attendance_Date: '2026-08-02', Employee_ID: 'EMP003', Check_In_Time: '', Check_Out_Time: '', Check_In_Method: '', Check_Out_Method: '', Late_Minutes: 0, Early_Leave_Minutes: 0, Overtime_Minutes: 0, Work_Hours: 0, Attendance_Status: 'Absent', Shift_Name: 'Day Shift', Notes: 'Sick leave', Half_Day_Absence_Flag: false },
  { Attendance_ID: 'ATT008', Attendance_Date: '2026-08-02', Employee_ID: 'EMP004', Check_In_Time: '08:05', Check_Out_Time: '17:00', Check_In_Method: 'Fingerprint', Check_Out_Method: 'Fingerprint', Late_Minutes: 5, Early_Leave_Minutes: 0, Overtime_Minutes: 0, Work_Hours: 8.92, Attendance_Status: 'Late', Shift_Name: 'Day Shift', Notes: '', Half_Day_Absence_Flag: false },
];

export const attendanceSummaries: AttendanceSummary[] = [
  { Summary_ID: 'SUM001', Attendance_Month: '2026-08', Employee_ID: 'EMP001', Employee_Name: 'Somchai Vongphachan', Department_ID: 'DEPT01', Department_Name: 'Human Resources', Scheduled_Workdays: 22, Present_Days: 22, Late_Days: 0, Absent_Days: 0, Approved_Leave_Days: 0, Weekly_Off_Days: 4, Holiday_Days: 1, OT_Days: 0, Total_Late_Minutes: 0, Total_Overtime_Minutes: 0, Total_Work_Hours: 198, Attendance_Rate: 100 },
  { Summary_ID: 'SUM002', Attendance_Month: '2026-08', Employee_ID: 'EMP002', Employee_Name: 'Souphaphone Vongsa', Department_ID: 'DEPT02', Department_Name: 'Accounting and Finance', Scheduled_Workdays: 22, Present_Days: 20, Late_Days: 2, Absent_Days: 0, Approved_Leave_Days: 2, Weekly_Off_Days: 4, Holiday_Days: 1, OT_Days: 1, Total_Late_Minutes: 20, Total_Overtime_Minutes: 60, Total_Work_Hours: 185, Attendance_Rate: 95 },
  { Summary_ID: 'SUM003', Attendance_Month: '2026-08', Employee_ID: 'EMP003', Employee_Name: 'Manivone Phommavong', Department_ID: 'DEPT02', Department_Name: 'Accounting and Finance', Scheduled_Workdays: 22, Present_Days: 19, Late_Days: 1, Absent_Days: 2, Approved_Leave_Days: 1, Weekly_Off_Days: 4, Holiday_Days: 1, OT_Days: 0, Total_Late_Minutes: 10, Total_Overtime_Minutes: 0, Total_Work_Hours: 170, Attendance_Rate: 88 },
  { Summary_ID: 'SUM004', Attendance_Month: '2026-08', Employee_ID: 'EMP004', Employee_Name: 'Noy Dalaloy', Department_ID: 'DEPT01', Department_Name: 'Human Resources', Scheduled_Workdays: 22, Present_Days: 21, Late_Days: 1, Absent_Days: 0, Approved_Leave_Days: 1, Weekly_Off_Days: 4, Holiday_Days: 1, OT_Days: 0, Total_Late_Minutes: 5, Total_Overtime_Minutes: 0, Total_Work_Hours: 189, Attendance_Rate: 97 },
];

export const leaveRequests: LeaveRequest[] = [
  { Leave_Request_ID: 'LR001', Request_Date: '2026-08-05', Employee_ID: 'EMP003', Leave_Type: 'Sick Leave', Start_Date: '2026-08-02', End_Date: '2026-08-02', Total_Days: 1, Half_Day_Flag: false, Reason: 'Not feeling well', Approver_Employee_ID: 'EMP002', Approval_Status: 'Approved', Approved_Date: '2026-08-02', Rejected_Date: '', Rejection_Reason: '', Notes: '' },
  { Leave_Request_ID: 'LR002', Request_Date: '2026-08-10', Employee_ID: 'EMP003', Leave_Type: 'Sick Leave', Start_Date: '2026-08-15', End_Date: '2026-08-16', Total_Days: 2, Half_Day_Flag: false, Reason: 'Medical appointment', Approver_Employee_ID: 'EMP002', Approval_Status: 'Approved', Approved_Date: '2026-08-10', Rejected_Date: '', Rejection_Reason: '', Notes: '' },
  { Leave_Request_ID: 'LR003', Request_Date: '2026-08-18', Employee_ID: 'EMP001', Leave_Type: 'Annual Leave', Start_Date: '2026-09-01', End_Date: '2026-09-03', Total_Days: 3, Half_Day_Flag: false, Reason: 'Family trip to Luang Prabang', Approver_Employee_ID: '', Approval_Status: 'Pending', Approved_Date: '', Rejected_Date: '', Rejection_Reason: '', Notes: '' },
  { Leave_Request_ID: 'LR004', Request_Date: '2026-08-20', Employee_ID: 'EMP004', Leave_Type: 'Personal Leave', Start_Date: '2026-08-25', End_Date: '2026-08-25', Total_Days: 1, Half_Day_Flag: false, Reason: 'Personal errands', Approver_Employee_ID: 'EMP001', Approval_Status: 'Pending', Approved_Date: '', Rejected_Date: '', Rejection_Reason: '', Notes: '' },
];

export const leaveBalances: LeaveBalance[] = [
  { Balance_ID: 'LB001', Employee_ID: 'EMP001', Leave_Year: 2026, Annual_Leave_Entitlement: 15, Sick_Leave_Entitlement: 30, Personal_Leave_Entitlement: 5, Maternity_Leave_Entitlement: 0, Carried_Forward_Days: 2, Used_Annual_Leave: 5, Used_Sick_Leave: 1, Used_Personal_Leave: 1, Used_Maternity_Leave: 0, Remaining_Leave: 11, Last_Updated: '2026-08-20' },
  { Balance_ID: 'LB002', Employee_ID: 'EMP002', Leave_Year: 2026, Annual_Leave_Entitlement: 15, Sick_Leave_Entitlement: 30, Personal_Leave_Entitlement: 5, Maternity_Leave_Entitlement: 0, Carried_Forward_Days: 3, Used_Annual_Leave: 7, Used_Sick_Leave: 2, Used_Personal_Leave: 0, Used_Maternity_Leave: 0, Remaining_Leave: 8, Last_Updated: '2026-08-20' },
  { Balance_ID: 'LB003', Employee_ID: 'EMP003', Leave_Year: 2026, Annual_Leave_Entitlement: 12, Sick_Leave_Entitlement: 30, Personal_Leave_Entitlement: 5, Maternity_Leave_Entitlement: 0, Carried_Forward_Days: 0, Used_Annual_Leave: 3, Used_Sick_Leave: 3, Used_Personal_Leave: 1, Used_Maternity_Leave: 0, Remaining_Leave: 9, Last_Updated: '2026-08-20' },
  { Balance_ID: 'LB004', Employee_ID: 'EMP004', Leave_Year: 2026, Annual_Leave_Entitlement: 12, Sick_Leave_Entitlement: 30, Personal_Leave_Entitlement: 5, Maternity_Leave_Entitlement: 0, Carried_Forward_Days: 0, Used_Annual_Leave: 0, Used_Sick_Leave: 0, Used_Personal_Leave: 0, Used_Maternity_Leave: 0, Remaining_Leave: 12, Last_Updated: '2026-08-20' },
];

export const payrollRecords: PayrollRecord[] = [
  { Payroll_ID: 'PR001', Payroll_Month: 8, Payroll_Year: 2026, Employee_ID: 'EMP001', Department_ID: 'DEPT01', Basic_Salary: 8500000, Overtime_Pay: 0, Bonus: 500000, Allowance: 0, Commission: 0, Gross_Pay: 9000000, Total_Deductions: 20000, Net_Pay: 8980000, Payroll_Status: 'Paid', Paid_Date: '2026-08-31', Payment_Method: 'Bank Transfer', Remarks: '' },
  { Payroll_ID: 'PR002', Payroll_Month: 8, Payroll_Year: 2026, Employee_ID: 'EMP002', Department_ID: 'DEPT02', Basic_Salary: 9500000, Overtime_Pay: 200000, Bonus: 600000, Allowance: 0, Commission: 0, Gross_Pay: 10300000, Total_Deductions: 20000, Net_Pay: 10280000, Payroll_Status: 'Paid', Paid_Date: '2026-08-31', Payment_Method: 'Bank Transfer', Remarks: '' },
  { Payroll_ID: 'PR003', Payroll_Month: 8, Payroll_Year: 2026, Employee_ID: 'EMP003', Department_ID: 'DEPT02', Basic_Salary: 4200000, Overtime_Pay: 0, Bonus: 200000, Allowance: 0, Commission: 0, Gross_Pay: 4400000, Total_Deductions: 0, Net_Pay: 4400000, Payroll_Status: 'Paid', Paid_Date: '2026-08-31', Payment_Method: 'Bank Transfer', Remarks: '' },
  { Payroll_ID: 'PR004', Payroll_Month: 8, Payroll_Year: 2026, Employee_ID: 'EMP004', Department_ID: 'DEPT01', Basic_Salary: 36000000, Overtime_Pay: 0, Bonus: 0, Allowance: 0, Commission: 0, Gross_Pay: 36000000, Total_Deductions: 0, Net_Pay: 36000000, Payroll_Status: 'Pending', Paid_Date: '', Payment_Method: '', Remarks: 'Probation period' },
];

export const holidays: Holiday[] = [
  { Holiday_ID: 'HOL001', Holiday_Date: '2026-01-01', Holiday_Name: 'New Year Day', Holiday_Type: 'Public', Applies_To: 'All', Is_Recurring: true, Notes: '', Active_Status: 'Active' },
  { Holiday_ID: 'HOL002', Holiday_Date: '2026-02-14', Holiday_Name: 'Boun Makha Bousa', Holiday_Type: 'Religious', Applies_To: 'All', Is_Recurring: true, Notes: 'Visakha Buja', Active_Status: 'Active' },
  { Holiday_ID: 'HOL003', Holiday_Date: '2026-04-14', Holiday_Name: 'Lao New Year', Holiday_Type: 'Public', Applies_To: 'All', Is_Recurring: true, Notes: 'Pi Mai Lao', Active_Status: 'Active' },
  { Holiday_ID: 'HOL004', Holiday_Date: '2026-04-15', Holiday_Name: 'Lao New Year', Holiday_Type: 'Public', Applies_To: 'All', Is_Recurring: true, Notes: '', Active_Status: 'Active' },
  { Holiday_ID: 'HOL005', Holiday_Date: '2026-04-16', Holiday_Name: 'Lao New Year', Holiday_Type: 'Public', Applies_To: 'All', Is_Recurring: true, Notes: '', Active_Status: 'Active' },
  { Holiday_ID: 'HOL006', Holiday_Date: '2026-05-01', Holiday_Name: 'Labour Day', Holiday_Type: 'Public', Applies_To: 'All', Is_Recurring: true, Notes: '', Active_Status: 'Active' },
  { Holiday_ID: 'HOL007', Holiday_Date: '2026-12-02', Holiday_Name: 'National Day', Holiday_Type: 'Public', Applies_To: 'All', Is_Recurring: true, Notes: '', Active_Status: 'Active' },
];

export const jobOpenings: JobOpening[] = [
  { Job_ID: 'JOB001', Position_ID: 'POS04', Department_ID: 'DEPT03', Department_Name: 'Front Office', Open_Date: '2026-08-01', Closing_Date: '2026-09-01', Vacancy_Count: 1, Location: 'Vientiane', Employment_Type: 'Full-Time', Job_Status: 'Open', Description: 'Looking for experienced receptionist', Total_Applicants_Count: 5, Total_Interviewed: 2 },
  { Job_ID: 'JOB002', Position_ID: 'POS07', Department_ID: 'DEPT04', Department_Name: 'Housekeeping', Open_Date: '2026-08-10', Closing_Date: '2026-09-10', Vacancy_Count: 3, Location: 'Vientiane', Employment_Type: 'Full-Time', Job_Status: 'Open', Description: 'Room attendants needed', Total_Applicants_Count: 8, Total_Interviewed: 4 },
];

export const applicants: Applicant[] = [
  { Applicant_ID: 'APP001', Job_ID: 'JOB001', First_Name: 'Ketsana', Last_Name: 'Souliyavong', Gender: 'Male', Phone: '+856 20 5555 2001', Email: 'ketsana@email.com', Education_Level: 'Bachelor Degree', Experience_Years: 3, Expected_Salary: 4000000, Source: 'Facebook', Application_Date: '2026-08-05', Applicant_Status: 'Interviewed', CV_URL: '', Time_to_Hire_Days: 0 },
  { Applicant_ID: 'APP002', Job_ID: 'JOB001', First_Name: 'Phonevilai', Last_Name: 'Chanthalangsy', Gender: 'Female', Phone: '+856 20 5555 2002', Email: 'phonevilai@email.com', Education_Level: 'Diploma', Experience_Years: 2, Expected_Salary: 3500000, Source: 'Walk-in', Application_Date: '2026-08-07', Applicant_Status: 'Shortlisted', CV_URL: '', Time_to_Hire_Days: 0 },
  { Applicant_ID: 'APP003', Job_ID: 'JOB002', First_Name: 'Seng', Last_Name: 'Vongsavath', Gender: 'Male', Phone: '+856 20 5555 2003', Email: 'seng@email.com', Education_Level: 'High School', Experience_Years: 1, Expected_Salary: 3000000, Source: 'Referral', Application_Date: '2026-08-12', Applicant_Status: 'New', CV_URL: '', Time_to_Hire_Days: 0 },
  { Applicant_ID: 'APP004', Job_ID: 'JOB002', First_Name: 'Dalavan', Last_Name: 'Phommasone', Gender: 'Female', Phone: '+856 20 5555 2004', Email: 'dalavan@email.com', Education_Level: 'High School', Experience_Years: 5, Expected_Salary: 3200000, Source: 'Facebook', Application_Date: '2026-08-13', Applicant_Status: 'Interviewed', CV_URL: '', Time_to_Hire_Days: 0 },
];

export const documents: Document[] = [
  { Document_ID: 'DOC001', Employee_ID: 'EMP001', Document_Type: 'National ID', Document_Number: '01-08-001234', Issue_Date: '2020-01-15', Expiry_Date: '2030-01-15', Renewal_Reminder_Days: 90, Reminder_30_Days: false, Reminder_60_Days: false, Reminder_90_Days: false, File_Name: 'id_somchai.pdf', File_URL: '', Status: 'Valid', Notes: '' },
  { Document_ID: 'DOC002', Employee_ID: 'EMP001', Document_Type: 'Work Permit', Document_Number: 'WP-2024-001', Issue_Date: '2024-01-01', Expiry_Date: '2025-01-01', Renewal_Reminder_Days: 60, Reminder_30_Days: true, Reminder_60_Days: true, Reminder_90_Days: true, File_Name: 'wp_somchai.pdf', File_URL: '', Status: 'Expiring Soon', Notes: 'Needs renewal' },
  { Document_ID: 'DOC003', Employee_ID: 'EMP002', Document_Type: 'National ID', Document_Number: '01-08-005678', Issue_Date: '2019-06-10', Expiry_Date: '2029-06-10', Renewal_Reminder_Days: 90, Reminder_30_Days: false, Reminder_60_Days: false, Reminder_90_Days: false, File_Name: 'id_souphaphone.pdf', File_URL: '', Status: 'Valid', Notes: '' },
  { Document_ID: 'DOC004', Employee_ID: 'EMP003', Document_Type: 'Education Certificate', Document_Number: 'EDU-2022-100', Issue_Date: '2022-05-20', Expiry_Date: '', Renewal_Reminder_Days: 0, Reminder_30_Days: false, Reminder_60_Days: false, Reminder_90_Days: false, File_Name: 'cert_manivone.pdf', File_URL: '', Status: 'Valid', Notes: '' },
];

export const trainingRecords: TrainingRecord[] = [
  { Training_Record_ID: 'TR001', Employee_ID: 'EMP001', Course_ID: 'CRS001', Course_Name: 'HR Management Fundamentals', Training_Date: '2026-06-15', Completion_Status: 'Completed', Score: 85, Certificate_No: 'CERT-HR-001', Certificate_Issue_Date: '2026-06-20', Certificate_Expiry_Date: '2028-06-20', Notes: '' },
  { Training_Record_ID: 'TR002', Employee_ID: 'EMP002', Course_ID: 'CRS002', Course_Name: 'Financial Reporting Standards', Training_Date: '2026-07-10', Completion_Status: 'Completed', Score: 92, Certificate_No: 'CERT-FIN-002', Certificate_Issue_Date: '2026-07-15', Certificate_Expiry_Date: '2027-07-15', Notes: '' },
  { Training_Record_ID: 'TR003', Employee_ID: 'EMP003', Course_ID: 'CRS003', Course_Name: 'Accounting Software Training', Training_Date: '2026-08-01', Completion_Status: 'In Progress', Score: 0, Certificate_No: '', Certificate_Issue_Date: '', Certificate_Expiry_Date: '', Notes: 'Ongoing' },
];

export const performanceReviews: PerformanceReview[] = [
  { Review_ID: 'REV001', Review_Period: '2026-H1', Employee_ID: 'EMP001', Reviewer_Employee_ID: '', KPI_Score: 88, Behavior_Score: 90, Attendance_Score: 100, Total_Score: 92, Rating: 'Excellent', Strengths: 'Leadership, Punctuality', Improvement_Areas: 'Delegation skills', Promotion_Recommendation: 'No', Review_Date: '2026-07-15', Next_Review_Date: '2027-01-15' },
  { Review_ID: 'REV002', Review_Period: '2026-H1', Employee_ID: 'EMP002', Reviewer_Employee_ID: '', KPI_Score: 85, Behavior_Score: 88, Attendance_Score: 95, Total_Score: 89, Rating: 'Very Good', Strengths: 'Accuracy, Dedication', Improvement_Areas: 'Team communication', Promotion_Recommendation: 'No', Review_Date: '2026-07-15', Next_Review_Date: '2027-01-15' },
  { Review_ID: 'REV003', Review_Period: '2026-H1', Employee_ID: 'EMP003', Reviewer_Employee_ID: 'EMP002', KPI_Score: 78, Behavior_Score: 82, Attendance_Score: 88, Total_Score: 82, Rating: 'Good', Strengths: 'Eager to learn', Improvement_Areas: 'Attention to detail', Promotion_Recommendation: 'No', Review_Date: '2026-07-15', Next_Review_Date: '2027-01-15' },
];

export const assets: Asset[] = [
  { Asset_ID: 'AST001', Asset_Tag: 'LAP-001', Asset_Name: 'Laptop Dell Latitude', Asset_Category: 'IT Equipment', Brand: 'Dell', Model: 'Latitude 5520', Serial_No: 'DL5520-001', Purchase_Date: '2024-03-01', Purchase_Cost: 12000000, Condition_Status: 'Good', Assigned_To_Employee_ID: 'EMP001', Location: 'HR Office', Warranty_Expiry_Date: '2027-03-01', Vendor: 'Lao Tech Solutions', Notes: '' },
  { Asset_ID: 'AST002', Asset_Tag: 'LAP-002', Asset_Name: 'Laptop HP ProBook', Asset_Category: 'IT Equipment', Brand: 'HP', Model: 'ProBook 450', Serial_No: 'HP450-002', Purchase_Date: '2024-03-01', Purchase_Cost: 10000000, Condition_Status: 'Good', Assigned_To_Employee_ID: 'EMP002', Location: 'Finance Office', Warranty_Expiry_Date: '2027-03-01', Vendor: 'Lao Tech Solutions', Notes: '' },
  { Asset_ID: 'AST003', Asset_Tag: 'PHN-001', Asset_Name: 'Company Phone', Asset_Category: 'Mobile Device', Brand: 'Samsung', Model: 'Galaxy A54', Serial_No: 'SM-A54-001', Purchase_Date: '2025-01-15', Purchase_Cost: 4500000, Condition_Status: 'Good', Assigned_To_Employee_ID: 'EMP003', Location: '', Warranty_Expiry_Date: '2026-01-15', Vendor: 'Samsung Laos', Notes: '' },
];
