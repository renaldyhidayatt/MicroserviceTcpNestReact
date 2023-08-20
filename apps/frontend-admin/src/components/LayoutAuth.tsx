import { Outlet } from 'react-router-dom';

export default function LayoutAuth() {
  return (
    <div id="auth">
      <div className="row h-100">
        <div className="col-lg-5 col-12">
          <div id="auth-left">
            <div className="auth-logo">
              <a href="index.html">
                <img src="assets/compiled/svg/logo.svg" alt="Logo" />
              </a>
            </div>
            <Outlet />
          </div>
        </div>
        <div className="col-lg-7 d-none d-lg-block">
          <div id="auth-right"></div>
        </div>
      </div>
    </div>
  );
}
