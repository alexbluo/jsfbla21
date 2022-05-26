import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-16 py-16">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
