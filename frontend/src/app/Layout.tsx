import { Outlet } from 'react-router-dom';
import NavigationBar from '../features/NavigationBar/NavigationBar';

export default function Layout() {
  return (
    <div className=" min-h-screen">
      <NavigationBar mode="sticky" />

      <Outlet />
    </div>
  );
}
