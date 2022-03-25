import { NavLink, NavLinkProps, useLocation } from "react-router-dom"

// https://reactrouter.com/docs/en/v6/getting-started/tutorial#custom-behavior
// Just a regular NavLink but keeps the URL parameters
export const QueryNavLink = (props: NavLinkProps & React.RefAttributes<HTMLAnchorElement>) : JSX.Element =>  {
  const { to, ...otherProps } = props
  const location = useLocation();

  return <NavLink to={to + location.search} { ... otherProps } />
}