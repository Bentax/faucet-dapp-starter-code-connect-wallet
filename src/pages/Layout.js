import { Outlet, Link } from "react-router-dom";
import "../App.css";


const Layout = () => {
  return (
    <div>
      <nav className="navbar navbar-item">
            <Link to="/">🟢</Link>
            <Link to="/third">🔴</Link>
      </nav>
      <Outlet />
    </div>
  )
};

export default Layout;