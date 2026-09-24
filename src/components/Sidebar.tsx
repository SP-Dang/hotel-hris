import { LayoutDashboard, Users, Clock, CalendarDays, DollarSign, Building2, Settings, Hotel, LogOut, Menu, X, Briefcase, FileText, GraduationCap, Award, Package } from 'lucide-react';
import { PageType } from '../types';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const menuItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'employees', label: 'Employees', icon: <Users size={20} /> },
  { id: 'attendance', label: 'Attendance', icon: <Clock size={20} /> },
  { id: 'leave', label: 'Leave', icon: <CalendarDays size={20} /> },
  { id: 'payroll', label: 'Payroll', icon: <DollarSign size={20} /> },
  { id: 'departments', label: 'Departments', icon: <Building2 size={20} /> },
  { id: 'recruitment', label: 'Recruitment', icon: <Briefcase size={20} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={20} /> },
  { id: 'training', label: 'Training', icon: <GraduationCap size={20} /> },
  { id: 'kpi', label: 'Performance', icon: <Award size={20} /> },
  { id: 'assets', label: 'Assets', icon: <Package size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <button className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white flex flex-col transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-indigo-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
              <Hotel size={24} className="text-indigo-900" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">HR & Admin</h1>
              <p className="text-indigo-300 text-xs">Hotel Management System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onPageChange(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${currentPage === item.id ? 'bg-white/15 text-white shadow-lg shadow-indigo-900/20' : 'text-indigo-200 hover:bg-white/10 hover:text-white'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-700">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.email || 'User'}</p>
              <p className="text-xs text-indigo-300 truncate">{user?.role || 'Employee'}</p>
            </div>
            <button 
              onClick={logout}
              className="text-indigo-300 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
