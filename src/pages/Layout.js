import { Outlet, Link } from "react-router-dom";


const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Faucet</Link>
          </li>
          <li>
            <Link to="/second">Second</Link>
          </li>
          <li>
            <Link to="/dao">DAO</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;