import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layouts() {
  return (
    <div id="app">
      <Sidebar />
      <div id="main">
        <header className="mb-3">
          <button type="button" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </button>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
