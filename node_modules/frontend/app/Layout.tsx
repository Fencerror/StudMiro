import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../features/NavigationBar/NavigationBar';
import Footer from '../features/Footer/Footer';

export default function Layout() {
  return (
    <div className="layout-bg min-h-screen flex flex-col overflow-x-hidden">
      <NavigationBar mode="sticky" />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}