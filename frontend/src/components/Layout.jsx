import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-16 py-16">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
