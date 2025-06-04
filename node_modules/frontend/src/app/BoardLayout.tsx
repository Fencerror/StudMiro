import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../features/NavigationBar/NavigationBar';

export default function BoardLayout() {
  return (
    <>
      <NavigationBar mode="fixed" />

      <Outlet />
    </>
  );
}
