import { Outlet, Link } from "react-router-dom";
import "../App.css";


const Layout = () => {
  return (
    <div>
      <nav className="navbar navbar-item">
        
            <Link to="/">⛏Faucet</Link>
          
            <Link to="/second">🦄Second</Link>
          
            <Link to="/third">👍Third</Link>
          
      </nav>

      <Outlet />
    </div>
  )
};

export default Layout;