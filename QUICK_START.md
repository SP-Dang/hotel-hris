# 🚀 Quick Start Guide - HR & Admin System

## ⚡ Fast Setup (5 Minutes)

### Step 1: Deploy Google Apps Script
```
1. Open your Google Sheet
2. Extensions → Apps Script
3. Copy code from: google-apps-script/Code.gs
4. Paste into Apps Script editor
5. Deploy → New deployment → Web app
6. Execute as: Me | Who has access: Anyone
7. Copy the Web app URL
```

### Step 2: Connect Frontend
```
1. Open the frontend web app
2. Go to Settings page
3. Paste your Web app URL
4. Click "Save URL"
5. Click "Test Connection"
6. Refresh the page
```

### ✅ That's it! Your system is now live!

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `google-apps-script/Code.gs` | Backend API code (paste into Apps Script) |
| `src/services/googleSheetsApi.ts` | Frontend API service |
| `src/components/Settings.tsx` | Settings page with URL input |
| `SETUP_GUIDE.md` | Complete detailed guide |

---

## 🔗 Useful URLs

- **Your Google Sheet**: https://docs.google.com/spreadsheets/d/107BcqBwXUbE9VPf14rzIq8nNrJLzXgra1ooGEWoDloU/edit
- **Apps Script Editor**: Extensions → Apps Script (in your sheet)
- **Web App URL**: (you'll get this after deployment)

---

## 🧪 Test Your API

After deployment, test by opening in browser:
```
https://script.google.com/macros/s/YOUR-ID/exec?action=getAllSheets
```

Should return:
```json
{
  "sheets": ["00_Dashboard", "01_Company_Profile", ...],
  "count": 43
}
```

---

## 📊 Sheet Tabs Connected

The frontend connects to these tabs automatically:

| Module | Sheet Tab |
|--------|-----------|
| Dashboard | 00_Dashboard |
| Employees | 10_Employees |
| Departments | 02_Departments |
| Attendance | 30_Attendance_Log, 33_Attendance_Summary |
| Leave | 40_Leave_Balance, 41_Leave_Requests |
| Payroll | 50_Payroll_Monthly |
| Recruitment | 80_Job_Openings, 81_Applicants |
| Documents | 20_Employee_Documents |
| Training | 71_Training_Records |
| Performance | 61_Performance_Reviews |
| Assets | 90_Assets |
| Holidays | 04_Holidays |

---

## 🐛 Quick Troubleshooting

**"Failed to fetch"**
→ Check "Who has access" = Anyone in deployment

**"Sheet not found"**
→ Verify sheet tab names match exactly (case-sensitive)

**Empty data**
→ Check Apps Script execution log (View → Executions)

**Changes not showing**
→ Clear browser cache (Ctrl+Shift+R)

---

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Check browser console (F12) for errors
3. Check Apps Script execution log
4. Test API URL directly in browser

---

## ✨ Features

- ✅ Real-time data from Google Sheets
- ✅ No rebuild needed when changing URL
- ✅ 12 modules covering all HR functions
- ✅ Lao Kip (₭) currency support
- ✅ Responsive design (mobile + desktop)
- ✅ Search and filter on all pages
- ✅ Export functionality
- ✅ Status badges and visual indicators

---

**Ready to go live?** Follow the steps above and you're done! 🎉
