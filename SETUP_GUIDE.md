# 🏨 HR & Admin Management System - Setup Guide

## Complete Step-by-Step Instructions to Connect Frontend to Google Sheets

---

## 📋 Overview

This guide will help you connect the frontend web application to your Google Sheet backend.

**Architecture:**
```
Google Sheet → Google Apps Script (API) → Frontend Web App
```

**What you'll need:**
1. ✅ Your Google Sheet (already created)
2. ✅ This frontend code (already built)
3. ⏳ Google Apps Script deployment (10 minutes)
4. ⏳ Configuration update (2 minutes)

---

## 🚀 STEP 1: Deploy Google Apps Script

### 1.1 Open Your Google Sheet

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/107BcqBwXUbE9VPf14rzIq8nNrJLzXgra1ooGEWoDloU/edit
2. Make sure you're logged in with the account that owns the sheet

### 1.2 Open Apps Script Editor

1. In the Google Sheet menu, click: **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. You'll see a default function `myFunction()`

### 1.3 Copy the Backend Code

1. Open the file: `google-apps-script/Code.gs` (in this project)
2. **Select all** the code (Ctrl+A or Cmd+A)
3. **Copy** it (Ctrl+C or Cmd+C)
4. Go back to the Apps Script editor
5. **Delete** the default `myFunction()` code
6. **Paste** the code from Code.gs (Ctrl+V or Cmd+V)
7. The editor should now show the full backend script

### 1.4 Test the Script (Optional but Recommended)

1. In the Apps Script editor, find the function dropdown at the top
2. Select `testScript` from the dropdown
3. Click the **Run** button (▶️ icon)
4. First time running, you'll need to authorize:
   - Click "Review permissions"
   - Select your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
5. Check the **Execution log** at the bottom - you should see:
   ```
   Available sheets: {...}
   Employees: X rows
   Headers: [...]
   First employee: {...}
   ```
6. If you see this, the script is working correctly! ✅

### 1.5 Deploy as Web App

1. In the Apps Script editor, click **Deploy** (top right)
2. Click **New deployment**
3. Click the **gear icon** ⚙️ next to "Select type"
4. Select **Web app**
5. Fill in the configuration:
   - **Description**: `HR & Admin API v1`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
6. Click **Deploy**
7. **IMPORTANT**: Copy the **Web app URL** that appears
   - It looks like: `https://script.google.com/macros/s/AKfycbx.../exec`
   - **Save this URL somewhere safe!** You'll need it next.

### 1.6 Test the API (Optional)

1. Open a new browser tab
2. Paste your Web app URL
3. Add `?action=getAllSheets` at the end
4. Full URL example: `https://script.google.com/macros/s/AKfycbx.../exec?action=getAllSheets`
5. Press Enter
6. You should see JSON output like:
   ```json
   {
     "sheets": ["00_Dashboard", "01_Company_Profile", ...],
     "count": 43
   }
   ```
7. If you see this, your API is working! ✅

---

## 🔧 STEP 2: Configure the Frontend

### 2.1 Update the API URL

1. Open the file: `src/services/googleSheetsApi.ts`
2. Find this line (around line 15):
   ```typescript
   const API_BASE_URL = ''; // e.g., 'https://script.google.com/macros/s/AKfycbx.../exec'
   ```
3. Replace the empty string with your Web app URL:
   ```typescript
   const API_BASE_URL = 'https://script.google.com/macros/s/YOUR-DEPLOYMENT-ID/exec';
   ```
4. Save the file

### 2.2 Rebuild the Frontend

Open your terminal in the project directory and run:

```bash
npm run build
```

This will create a new `dist/` folder with the updated code.

---

## 🧪 STEP 3: Test the Connection

### 3.1 Test in Browser

1. Open the built frontend: `dist/index.html`
2. Open **Developer Tools** (F12 or right-click → Inspect)
3. Go to the **Console** tab
4. You should see messages like:
   ```
   Google Sheets API configured
   Fetching data from: https://script.google.com/macros/s/...
   ```
5. If you see errors, check:
   - ✅ Is the Web app URL correct?
   - ✅ Did you set "Who has access" to "Anyone"?
   - ✅ Is your Google Sheet shared properly?

### 3.2 Test Each Module

Go through each page in the frontend:

1. **Dashboard** - Should show real data from your sheet
2. **Employees** - Should list employees from `10_Employees` tab
3. **Attendance** - Should show data from `30_Attendance_Log`
4. **Leave** - Should show data from `41_Leave_Requests`
5. **Payroll** - Should show data from `50_Payroll_Monthly`
6. **Departments** - Should show data from `02_Departments`
7. **Recruitment** - Should show data from `80_Job_Openings`
8. **Documents** - Should show data from `20_Employee_Documents`
9. **Training** - Should show data from `71_Training_Records`
10. **Performance** - Should show data from `61_Performance_Reviews`
11. **Assets** - Should show data from `90_Assets`

---

## 🐛 Troubleshooting

### Problem: "Failed to fetch" or CORS errors

**Solution:**
1. Check that "Who has access" is set to "Anyone" in the deployment
2. Make sure you're using the correct Web app URL (not the /dev URL)
3. Try opening the API URL directly in browser to test

### Problem: Data shows as empty

**Solution:**
1. Check the Apps Script execution log (View → Executions)
2. Verify your sheet tab names match exactly (case-sensitive)
3. Make sure there are no extra spaces in tab names
4. Check that headers are in row 1

### Problem: "Sheet not found" error

**Solution:**
1. Verify the sheet tab name in your Google Sheet
2. Check for typos in the `SHEET_TABS` array in Code.gs
3. Make sure the sheet is not hidden

### Problem: Changes not reflecting

**Solution:**
1. Clear browser cache (Ctrl+Shift+R for hard refresh)
2. Check if you need to redeploy the Apps Script
3. Verify the Web app URL hasn't changed

---

## 📊 Data Format

### How Data is Transformed

**Google Sheet format:**
```
| Employee_ID | First_Name | Last_Name | Department |
|-------------|------------|-----------|------------|
| EMP001      | John       | Doe       | HR         |
| EMP002      | Jane       | Smith     | Finance    |
```

**API returns:**
```json
{
  "sheet": "10_Employees",
  "headers": ["Employee_ID", "First_Name", "Last_Name", "Department"],
  "data": [
    {
      "Employee_ID": "EMP001",
      "First_Name": "John",
      "Last_Name": "Doe",
      "Department": "HR",
      "_rowIndex": 2
    },
    {
      "Employee_ID": "EMP002",
      "First_Name": "Jane",
      "Last_Name": "Smith",
      "Department": "Finance",
      "_rowIndex": 3
    }
  ],
  "rowCount": 2
}
```

### Date Handling

- Dates are automatically converted to ISO format: `YYYY-MM-DD`
- Example: `2024-01-15`

### Empty Rows

- Rows with no data are automatically filtered out
- Only rows with at least one non-empty cell are included

---

## 🔐 Security Notes

### Current Setup (Development)
- Web app is accessible to "Anyone" with the URL
- Suitable for testing and internal use
- URL acts as a secret key

### Production Recommendations
1. **Add authentication** - Implement user login in the frontend
2. **Use Google OAuth** - Authenticate users before accessing data
3. **Restrict access** - Change "Who has access" to specific users
4. **Add API key** - Include a secret token in requests
5. **Enable logging** - Track all API access in Apps Script

---

## 📝 Next Steps

After successful connection:

1. **Test all modules** - Verify each page shows correct data
2. **Test write operations** - Try adding/editing employees
3. **Add error handling** - Show user-friendly error messages
4. **Add loading states** - Show spinners while fetching data
5. **Optimize performance** - Cache data, reduce API calls
6. **Deploy frontend** - Host on Vercel, Netlify, or similar

---

## 🆘 Need Help?

If you encounter issues:

1. Check the Apps Script execution log
2. Check browser console for errors
3. Verify all sheet tab names match exactly
4. Test the API URL directly in browser
5. Review the troubleshooting section above

---

## ✅ Checklist

Before going live, verify:

- [ ] Google Apps Script deployed successfully
- [ ] Web app URL copied and saved
- [ ] Frontend API_BASE_URL updated
- [ ] Frontend rebuilt with new URL
- [ ] All modules showing correct data
- [ ] Write operations working (add/edit)
- [ ] Error handling in place
- [ ] Loading states implemented
- [ ] Security measures reviewed
- [ ] Backup plan in place

---

**Congratulations!** 🎉 Your HR & Admin Management System is now connected to Google Sheets!
