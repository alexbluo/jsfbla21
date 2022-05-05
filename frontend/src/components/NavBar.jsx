import NavBarLink from "./NavBarLink";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 flex h-12 w-screen flex-row-reverse bg-red">
      <ul className="flex gap-4 self-center pr-8">
        <NavBarLink path="/attractions">Attractions</NavBarLink>
        <NavBarLink path="/map">Map</NavBarLink>
        <NavBarLink path="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
}
export default NavBar;
