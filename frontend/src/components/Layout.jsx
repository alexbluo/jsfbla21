import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-16 py-16">
        <Outlet />
      </main>
    </>
  );
}
