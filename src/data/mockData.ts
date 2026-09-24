// Mock data for testing
export const employees = [
  {
    Employee_ID: 'EMP001',
    Employee_Code: 'HR-001',
    Title: 'Mr',
    First_Name: 'John',
    Last_Name: 'Doe',
    Full_Name: 'John Doe',
    Gender: 'Male',
    Date_of_Birth: '1990-01-15',
    Nationality: 'American',
    Marital_Status: 'Single',
    Phone: '+1234567890',
    Email: 'john.doe@example.com',
    Emergency_Contact_Name: 'Jane Doe',
    Emergency_Contact_Phone: '+1234567891',
    Province: 'California',
    District: 'Los Angeles',
    City: 'LA',
    Address: '123 Main St',
    Department_ID: 'DEPT01',
    Position_ID: 'POS001',
    Supervisor_Employee_ID: '',
    Employment_Type: 'Full-Time',
    Employment_Status: 'Active',
    Join_Date: '2020-01-15',
    Probation_End_Date: '2020-04-15',
    Confirmation_Date: '2020-04-15',
    Resignation_Date: '',
    Basic_Salary: 50000,
    Bank_Name: 'Bank of America',
    Bank_Account_Name: 'John Doe',
    Bank_Account_No: '123456789',
    Tax_No: 'TAX001',
    Social_Security_No: 'SSN001',
    Photo_URL: '',
    Remarks: '',
    Department_Name: 'Human Resources',
    Year_of_Service: 4,
    Position_Name: 'HR Manager',
    Age: 34,
    Probation_Status: 'Confirmed',
    Weekly_Off_Days: 'Saturday,Sunday'
  }
];

export const departments = [
  {
    Department_ID: 'DEPT01',
    Department_Name: 'Human Resources',
    Department_Code: 'HR',
    Manager_Employee_ID: 'EMP001',
    Parent_Department: '',
    Description: 'Human Resources Department',
    Active_Status: 'Active'
  },
  {
    Department_ID: 'DEPT02',
    Department_Name: 'Finance',
    Department_Code: 'FIN',
    Manager_Employee_ID: '',
    Parent_Department: '',
    Description: 'Finance Department',
    Active_Status: 'Active'
  }
];
