import { Outlet } from "react-router-dom";
import NavItems from "./NavItems";

function NavBar() {
  return (
    <>
      <NavItems />
      <Outlet />
    </>
  );
}

export default NavBar;
