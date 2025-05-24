import styles from './AdminLayout_v2.module.css';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X, Home, Users, Settings, BarChart3 } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Vartotojai', path: '/admin/users' },
    { icon: BarChart3, label: 'Ataskaitos', path: '/admin/reports' },
    { icon: Settings, label: 'Nustatymai', path: '/admin/settings' },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.aside}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            sidebar header
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            nav bar
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            footer
        </div>
      </aside>

    {/* Main Content */}
    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
            {/* Čia bus rodomas turinys - naudokite <Outlet /> su React Router */}
        <Outlet />
        </div>
    </main>
      

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;