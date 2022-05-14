import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-8 py-16 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
