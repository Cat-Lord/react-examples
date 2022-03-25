import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Navigation = () => {
  // typescript has kinda sad object deconstruction with type annotation solution :(
  function getNavLinkStyle( { isActive } : { isActive: boolean }) : React.CSSProperties {
    return {
      display: "block",
      margin: "1rem 0",
      color: isActive ? "red" : "",
    };
  }

  return (
    <React.Fragment>
      <h2>Nav</h2>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
      <ul>
        <li key="cats">
          <NavLink 
            style={ getNavLinkStyle }
            to="cats"
          >
              Cats
          </NavLink>
        </li>
        <li key="shelters">
          <NavLink 
            style={ getNavLinkStyle }
            to="shelters"
          >
            Shelters
          </NavLink>
        </li>
      </ul>
      </nav>
      <Outlet />
    </React.Fragment>
  );
}