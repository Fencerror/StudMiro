import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../features/NavigationBar/NavigationBar';

export default function Layout() {
  return (
    <div className="layout-bg min-h-screen bg=[#242424]">
      <NavigationBar mode="sticky" />

      <Outlet />
    </div>
  );
}
