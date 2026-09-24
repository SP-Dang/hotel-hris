# 🚀 Complete Deployment Guide - HR & Admin System with Login

## ✅ What's Been Built

1. ✅ **Login System** - Email/password authentication
2. ✅ **Role-Based Access Control** - 4 user roles with different permissions
3. ✅ **Enhanced Backend** - Read + Write support
4. ✅ **All 11 Modules** - Connected to live Google Sheets data

---

## 📋 Pre-Deployment Checklist

### Step 1: Set Up User_Roles Sheet

Open your Google Sheet and go to the **User_Roles** tab. Add test users:

| Email | Role | Permissions | Password | Last_Login | Attempts | Locked_Until | Status |
|-------|------|-------------|----------|------------|----------|--------------|--------|
| admin@hotellaos.com | Admin | * | admin123 | | 0 | | Active |
| hrmanager@hotellaos.com | HR Manager | * | hrmanager123 | | 0 | | Active |
| hrstaff@hotellaos.com | HR Staff | view.employees,edit.employees,view.attendance,edit.attendance,view.leave,edit.leave | hrstaff123 | | 0 | | Active |
| employee@hotellaos.com | Hotel Employee | view.own.profile,view.own.attendance,view.own.leave,request.leave | employee123 | | 0 | | Active |

**⚠️ Important:** 
- Change these passwords before going live!
- The `Permissions` column uses comma-separated permission strings
- `*` means all permissions (Admin/HR Manager)

---

### Step 2: Update Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. **Delete all existing code**
4. Copy the entire content from `google-apps-script/Code.gs`
5. Paste it into the Apps Script editor
6. Click **Save** (💾 icon)

**What's new in this version:**
- ✅ Login/authentication functions
- ✅ POST request handler for write operations
- ✅ Add/Update/Delete operations for all modules
- ✅ Leave approval/rejection
- ✅ System logging

---

### Step 3: Redeploy Google Apps Script

1. Click **Deploy** → **Manage deployments**
2. Click the **pencil icon** (✏️) to edit
3. Change **Version** to "New version"
4. Click **Deploy**
5. **Copy the new Web App URL** (it will be different!)

**Test the deployment:**
- Open the URL in a new browser tab
- You should see JSON with all 47 sheet tabs
- If you see an error, check that "Who has access" = "Anyone"

---

### Step 4: Update Frontend API URL

1. Open `src/services/googleSheetsApi.ts`
2. Find this line (around line 12):
   ```typescript
   const PRODUCTION_API_URL = 'https://script.google.com/macros/s/AKfycbzCCJI8gdXl-ndEVqvsal2Tj-4z2S1HkJFdtYeQKhH6nmi5yhMxSozWray2CmoGBK6m/exec';
   ```
3. Replace the URL with your **new** Web App URL from Step 3
4. Save the file

---

### Step 5: Test Locally (Optional)

Before deploying, test the login system:

1. Refresh the preview in this chat
2. You should see the **Login page**
3. Try logging in with:
   - Email: `admin@hotellaos.com`
   - Password: `admin123`
4. You should be redirected to the Dashboard
5. Check the sidebar - you should see your email and role
6. Click the **logout button** (bottom of sidebar)
7. You should be redirected back to the Login page

---

## 🌐 Deploy to GitHub Pages

### Step 1: Download Your Project

1. Click the **"Download"** button (⬇️ icon) in the preview window
2. Save the ZIP file to your computer
3. Extract the ZIP file

---

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** button (top right) → **"New repository"**
3. Fill in:
   - **Repository name**: `hotel-hris` (or any name you prefer)
   - **Description**: "HR & Admin Management System with Login"
   - **Public** ✅ (GitHub Pages requires public repos for free accounts)
   - ❌ Don't initialize with README
4. Click **"Create repository"**

---

### Step 3: Update Base Path (Important!)

⚠️ **If you named your repo something other than `hotel-hris`**, you need to update the config:

1. Open `vite.config.js` in a text editor
2. Find this line:
   ```javascript
   base: '/hotel-hris/', // ⚠️ Change 'hotel-hris' to your GitHub repo name
   ```
3. Change `'hotel-hris'` to match your actual repo name
4. Save the file

---

### Step 4: Push Code to GitHub

Open **Terminal** (Mac/Linux) or **Command Prompt** (Windows) and run:

```bash
# Navigate to your extracted project folder
cd path/to/your/extracted/project

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "HRIS System with Login - Initial commit"

# Add your GitHub repository as remote
# ⚠️ Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/hotel-hris.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab (top menu)
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
5. Click **"Save"**

---

### Step 6: Wait for Deployment

- GitHub will build and deploy your site
- Takes about **1-3 minutes**
- You'll see a green checkmark when it's ready
- Refresh the Pages settings page to see your live URL

---

## 🌐 Your Live URL

Your site will be available at:

```
https://YOUR-USERNAME.github.io/hotel-hris/
```

**Example:**
- If your GitHub username is `john-doe`
- And your repo is `hotel-hris`
- Your URL will be: `https://john-doe.github.io/hotel-hris/`

---

## 🔐 Test the Login System

### Test User 1: Admin (Full Access)
- **Email**: `admin@hotellaos.com`
- **Password**: `admin123`
- **Can access**: All 11 modules
- **Can do**: View, edit, delete everything

### Test User 2: HR Manager (Full Access)
- **Email**: `hrmanager@hotellaos.com`
- **Password**: `hrmanager123`
- **Can access**: All 11 modules
- **Can do**: View, edit, delete everything

### Test User 3: HR Staff (Limited Access)
- **Email**: `hrstaff@hotellaos.com`
- **Password**: `hrstaff123`
- **Can access**: Employees, Attendance, Leave, Documents, Training, Departments
- **Can do**: View and edit employees, attendance, leave, documents, training

### Test User 4: Hotel Employee (Minimal Access)
- **Email**: `employee@hotellaos.com`
- **Password**: `employee123`
- **Can access**: Own profile, own attendance, own leave
- **Can do**: View own data, request leave

---

## 🎯 Role-Based Permissions

### Admin & HR Manager
✅ **Full Access:**
- Dashboard (all data)
- Employees (view, add, edit, delete)
- Attendance (view, edit)
- Leave (view, approve, reject)
- Payroll (view, edit)
- Departments (view)
- Recruitment (view, manage)
- Documents (view, add, edit)
- Training (view, add, edit)
- Performance (view)
- Assets (view, add, edit)
- Settings (full access)

### HR Staff
✅ **Limited Access:**
- Dashboard (limited data)
- Employees (view, add, edit)
- Attendance (view, edit)
- Leave (view, edit)
- Documents (view, add, edit)
- Training (view, add, edit)
- Departments (view)

❌ **No Access:**
- Payroll
- Recruitment
- Performance
- Assets
- Settings

### Hotel Employee
✅ **Minimal Access:**
- Own profile
- Own attendance records
- Own leave balance
- Request leave

❌ **No Access:**
- Other employees' data
- Payroll
- Recruitment
- Performance
- Assets
- Settings

---

## 🔄 How to Update Your Site

Whenever you make changes:

```bash
# Make your changes in the code

# Build the project
npm run build

# Commit and push
git add .
git commit -m "Update description"
git push

# GitHub Pages will automatically rebuild!
```

---

## 🔒 Security Best Practices

### 1. Change Default Passwords
- Update the passwords in `User_Roles` sheet
- Use strong passwords (12+ characters, mix of letters/numbers/symbols)

### 2. Google Sheet Permissions
- Your Google Sheet is set to "Anyone with the link can view"
- This is needed for the API to work
- **Don't share the Google Sheet URL publicly**

### 3. Regular Backups
- Download your Google Sheet regularly
- Keep backups of important data

### 4. Monitor Login Attempts
- Check the `Attempts` column in `User_Roles`
- Accounts are locked after 5 failed attempts (30 minutes)

---

## 🆘 Troubleshooting

### Problem: Login doesn't work
- **Check**: Is the email exactly as in `User_Roles` sheet?
- **Check**: Is the password correct?
- **Check**: Is the account status "Active"?
- **Check**: Is the account locked? (check `Locked_Until` column)

### Problem: Can't access certain pages
- **Check**: Does your role have permission for that page?
- **Check**: Are you logged in with the correct account?

### Problem: Changes don't save
- **Check**: Does your role have edit permission?
- **Check**: Is the Google Apps Script deployed correctly?
- **Check**: Browser console for errors (F12)

### Problem: Page shows 404 after deployment
- **Check**: Did you update the `base` path in `vite.config.js`?
- **Check**: Does it match your GitHub repo name exactly?

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR HRIS SYSTEM                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND (GitHub Pages)                                    │
│  ├── React App with Login System                           │
│  ├── Role-Based Access Control                             │
│  ├── 11 Modules (Dashboard, Employees, etc.)              │
│  └── URL: https://YOUR-USERNAME.github.io/hotel-hris/     │
│                                                              │
│  ↕ (HTTP Requests - JSONP for read, POST for write)       │
│                                                              │
│  BACKEND API (Google Apps Script)                          │
│  ├── Authentication (login/logout)                         │
│  ├── Read Operations (GET)                                 │
│  ├── Write Operations (POST)                               │
│  └── URL: https://script.google.com/macros/s/.../exec     │
│                                                              │
│  ↕ (API Calls)                                              │
│                                                              │
│  DATA STORAGE (Google Sheets)                              │
│  ├── 47 Tabs (Employees, Attendance, Leave, etc.)         │
│  ├── User_Roles (authentication)                           │
│  └── All HR data                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| GitHub Pages | **Free** | Public repos only |
| Google Apps Script | **Free** | Up to 20,000 requests/day |
| Google Sheets | **Free** | Up to 5 million cells |
| **Total** | **$0/month** | ✅ |

---

## 🎉 You're Done!

Your HR & Admin Management System is now:
- ✅ Fully functional with login system
- ✅ Role-based access control
- ✅ Read + Write support
- ✅ Connected to live Google Sheets data
- ✅ Ready to deploy to GitHub Pages

**Next Steps:**
1. Follow the deployment steps above
2. Test all 4 user roles
3. Change default passwords
4. Share the URL with your team
5. Start using the system!

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Check browser console (F12) for errors
3. Check Google Apps Script execution log
4. Verify all URLs are correct

**Good luck with your deployment!** 🚀
