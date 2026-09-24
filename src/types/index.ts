export type PageType =
  | 'dashboard'
  | 'employees'
  | 'attendance'
  | 'leave'
  | 'payroll'
  | 'departments'
  | 'recruitment'
  | 'documents'
  | 'training'
  | 'kpi'
  | 'assets'
  | 'settings';

export interface Employee {
  Employee_ID: string;
  Employee_Code: string;
  Title: string;
  First_Name: string;
  Last_Name: string;
  Full_Name: string;
  Gender: 'Male' | 'Female';
  Date_of_Birth: string;
  Nationality: string;
  Marital_Status: string;
  Phone: string;
  Email: string;
  Emergency_Contact_Name: string;
  Emergency_Contact_Phone: string;
  Province: string;
  District: string;
  City: string;
  Address: string;
  Department_ID: string;
  Position_ID: string;
  Supervisor_Employee_ID: string;
  Employment_Type: string;
  Employment_Status: string;
  Join_Date: string;
  Probation_End_Date: string;
  Confirmation_Date: string;
  Resignation_Date: string;
  Basic_Salary: number;
  Bank_Name: string;
  Bank_Account_Name: string;
  Bank_Account_No: string;
  Tax_No: string;
  Social_Security_No: string;
  Photo_URL: string;
  Remarks: string;
  Department_Name: string;
  Year_of_Service: number;
  Position_Name: string;
  Age: number;
  Probation_Status: string;
  Weekly_Off_Days: string;
}

export interface Department {
  Department_ID: string;
  Department_Name: string;
  Department_Code: string;
  Manager_Employee_ID: string;
  Parent_Department: string;
  Description: string;
  Active_Status: string;
}

export interface Position {
  Position_ID: string;
  Position_Title: string;
  Position_Code: string;
  Department_ID: string;
  Grade: string;
  Level: string;
  Reports_To_Position_ID: string;
  Description: string;
  Active_Status: string;
}

export interface AttendanceRecord {
  Attendance_ID: string;
  Attendance_Date: string;
  Employee_ID: string;
  Check_In_Time: string;
  Check_Out_Time: string;
  Check_In_Method: string;
  Check_Out_Method: string;
  Late_Minutes: number;
  Early_Leave_Minutes: number;
  Overtime_Minutes: number;
  Work_Hours: number;
  Attendance_Status: string;
  Shift_Name: string;
  Notes: string;
  Half_Day_Absence_Flag: boolean;
}

export interface AttendanceSummary {
  Summary_ID: string;
  Attendance_Month: string;
  Employee_ID: string;
  Employee_Name: string;
  Department_ID: string;
  Department_Name: string;
  Scheduled_Workdays: number;
  Present_Days: number;
  Late_Days: number;
  Absent_Days: number;
  Approved_Leave_Days: number;
  Weekly_Off_Days: number;
  Holiday_Days: number;
  OT_Days: number;
  Total_Late_Minutes: number;
  Total_Overtime_Minutes: number;
  Total_Work_Hours: number;
  Attendance_Rate: number;
}

export interface LeaveRequest {
  Leave_Request_ID: string;
  Request_Date: string;
  Employee_ID: string;
  Leave_Type: string;
  Start_Date: string;
  End_Date: string;
  Total_Days: number;
  Half_Day_Flag: boolean;
  Reason: string;
  Approver_Employee_ID: string;
  Approval_Status: string;
  Approved_Date: string;
  Rejected_Date: string;
  Rejection_Reason: string;
  Notes: string;
}

export interface LeaveBalance {
  Balance_ID: string;
  Employee_ID: string;
  Leave_Year: number;
  Annual_Leave_Entitlement: number;
  Sick_Leave_Entitlement: number;
  Personal_Leave_Entitlement: number;
  Maternity_Leave_Entitlement: number;
  Carried_Forward_Days: number;
  Used_Annual_Leave: number;
  Used_Sick_Leave: number;
  Used_Personal_Leave: number;
  Used_Maternity_Leave: number;
  Remaining_Leave: number;
  Last_Updated: string;
}

export interface PayrollRecord {
  Payroll_ID: string;
  Payroll_Month: number;
  Payroll_Year: number;
  Employee_ID: string;
  Department_ID: string;
  Basic_Salary: number;
  Overtime_Pay: number;
  Bonus: number;
  Allowance: number;
  Commission: number;
  Gross_Pay: number;
  Total_Deductions: number;
  Net_Pay: number;
  Payroll_Status: string;
  Paid_Date: string;
  Payment_Method: string;
  Remarks: string;
}

export interface JobOpening {
  Job_ID: string;
  Position_ID: string;
  Department_ID: string;
  Department_Name: string;
  Open_Date: string;
  Closing_Date: string;
  Vacancy_Count: number;
  Location: string;
  Employment_Type: string;
  Job_Status: string;
  Description: string;
  Total_Applicants_Count: number;
  Total_Interviewed: number;
}

export interface Applicant {
  Applicant_ID: string;
  Job_ID: string;
  First_Name: string;
  Last_Name: string;
  Gender: string;
  Phone: string;
  Email: string;
  Education_Level: string;
  Experience_Years: number;
  Expected_Salary: number;
  Source: string;
  Application_Date: string;
  Applicant_Status: string;
  CV_URL: string;
  Time_to_Hire_Days: number;
}

export interface Document {
  Document_ID: string;
  Employee_ID: string;
  Document_Type: string;
  Document_Number: string;
  Issue_Date: string;
  Expiry_Date: string;
  Renewal_Reminder_Days: number;
  Reminder_30_Days: boolean;
  Reminder_60_Days: boolean;
  Reminder_90_Days: boolean;
  File_Name: string;
  File_URL: string;
  Status: string;
  Notes: string;
}

export interface TrainingRecord {
  Training_Record_ID: string;
  Employee_ID: string;
  Course_ID: string;
  Course_Name: string;
  Training_Date: string;
  Completion_Status: string;
  Score: number;
  Certificate_No: string;
  Certificate_Issue_Date: string;
  Certificate_Expiry_Date: string;
  Notes: string;
}

export interface PerformanceReview {
  Review_ID: string;
  Review_Period: string;
  Employee_ID: string;
  Reviewer_Employee_ID: string;
  KPI_Score: number;
  Behavior_Score: number;
  Attendance_Score: number;
  Total_Score: number;
  Rating: string;
  Strengths: string;
  Improvement_Areas: string;
  Promotion_Recommendation: string;
  Review_Date: string;
  Next_Review_Date: string;
}

export interface Asset {
  Asset_ID: string;
  Asset_Tag: string;
  Asset_Name: string;
  Asset_Category: string;
  Brand: string;
  Model: string;
  Serial_No: string;
  Purchase_Date: string;
  Purchase_Cost: number;
  Condition_Status: string;
  Assigned_To_Employee_ID: string;
  Location: string;
  Warranty_Expiry_Date: string;
  Vendor: string;
  Notes: string;
}

export interface Holiday {
  Holiday_ID: string;
  Holiday_Date: string;
  Holiday_Name: string;
  Holiday_Type: string;
  Applies_To: string;
  Is_Recurring: boolean;
  Notes: string;
  Active_Status: string;
}
